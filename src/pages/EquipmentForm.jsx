import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import { createEquipment, getEquipmentById, updateEquipment } from "../api/equipmentApi";

const emptyForm = {
  equipmentName: "",
  brand: "",
  model: "",
  serialNumber: "",
  storageLocation: "",
  totalQuantity: 0,
  minimumStockLevel: 0,
  description: "",
};

export default function EquipmentForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [currentImagePath, setCurrentImagePath] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      getEquipmentById(id).then((data) => {
        setForm({
          equipmentName: data.equipmentName || "",
          brand: data.brand || "",
          model: data.model || "",
          serialNumber: data.serialNumber || "",
          storageLocation: data.storageLocation || "",
          totalQuantity: data.totalQuantity || 0,
          minimumStockLevel: data.minimumStockLevel || 0,
          description: data.description || "",
        });
        setCurrentImagePath(data.imagePath);
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (imageFile) formData.append("image", imageFile);

    try {
      if (isEdit) {
        await updateEquipment(id, formData);
      } else {
        await createEquipment(formData);
      }
      navigate("/equipment");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h3 className="mb-4">{isEdit ? "Edit Equipment" : "Add New Equipment"}</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <ImageUpload currentImagePath={currentImagePath} onFileSelected={setImageFile} />

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Equipment Name *</label>
            <input
              className="form-control"
              name="equipmentName"
              value={form.equipmentName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Brand</label>
            <input className="form-control" name="brand" value={form.brand} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Model</label>
            <input className="form-control" name="model" value={form.model} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Serial Number</label>
            <input className="form-control" name="serialNumber" value={form.serialNumber} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Storage Location</label>
            <input
              className="form-control"
              name="storageLocation"
              value={form.storageLocation}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Total Quantity</label>
            <input
              type="number"
              min="0"
              className="form-control"
              name="totalQuantity"
              value={form.totalQuantity}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Minimum Stock Level</label>
            <input
              type="number"
              min="0"
              className="form-control"
              name="minimumStockLevel"
              value={form.minimumStockLevel}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : isEdit ? "Update Equipment" : "Create Equipment"}
        </button>
      </form>
    </div>
  );
}
