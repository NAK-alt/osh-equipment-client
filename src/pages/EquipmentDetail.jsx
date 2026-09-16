import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteEquipment, getEquipmentById } from "../api/equipmentApi";
import { normalizeEquipmentStatus } from "../utils/equipmentStatus";
import { imageUrl } from "../utils/imageUrl";

export default function EquipmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEquipmentById(id)
      .then(setItem)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this equipment? This cannot be undone.")) return;
    await deleteEquipment(id);
    navigate("/equipment");
  };

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (!item) return <div className="container mt-4">Equipment not found.</div>;

  const status = normalizeEquipmentStatus(item.status);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 text-center">
          <img
            src={imageUrl(item.imagePath)}
            alt={item.equipmentName}
            className="img-fluid rounded border mb-3"
          />
          {item.qrCodePath && (
            <div>
              <p className="mb-1 fw-bold">QR Code</p>
              <img src={imageUrl(item.qrCodePath)} alt="QR Code" style={{ width: "150px" }} />
            </div>
          )}
        </div>
        <div className="col-md-8">
          <h3>{item.equipmentName}</h3>
          <table className="table table-bordered w-auto">
            <tbody>
              <tr><th>Brand</th><td>{item.brand}</td></tr>
              <tr><th>Model</th><td>{item.model}</td></tr>
              <tr><th>Serial Number</th><td>{item.serialNumber}</td></tr>
              <tr><th>Storage Location</th><td>{item.storageLocation}</td></tr>
              <tr><th>Total Quantity</th><td>{item.totalQuantity}</td></tr>
              <tr><th>Available</th><td>{item.availableQuantity}</td></tr>
              <tr><th>Borrowed</th><td>{item.borrowedQuantity}</td></tr>
              <tr><th>Minimum Stock Level</th><td>{item.minimumStockLevel}</td></tr>
              <tr><th>Status</th><td>{status}</td></tr>
              <tr><th>Description</th><td>{item.description}</td></tr>
            </tbody>
          </table>
          <Link to={`/equipment/${id}/edit`} className="btn btn-primary me-2">
            Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
