import { useEffect, useState } from "react";
import { imageUrl } from "../utils/imageUrl";

/**
 * Reusable image upload + preview control.
 * currentImagePath: existing stored path, e.g. "/uploads/equipment/xxx.jpg" or a
 *   Firebase Storage signed URL for migrated items.
 * onFileSelected(file): called with the raw File object when a new image is chosen
 */
export default function ImageUpload({ currentImagePath, onFileSelected }) {
  const [preview, setPreview] = useState(
    imageUrl(currentImagePath || "/uploads/placeholder.png")
  );

  useEffect(() => {
    setPreview(imageUrl(currentImagePath || "/uploads/placeholder.png"));
  }, [currentImagePath]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onFileSelected(file);
  };

  return (
    <div className="mb-3">
      <label className="form-label">Equipment Image</label>
      <div className="mb-2">
        <img
          src={preview}
          alt="Preview"
          style={{ width: "160px", height: "160px", objectFit: "cover" }}
          className="rounded border"
        />
      </div>
      <input type="file" accept="image/png, image/jpeg, image/webp" className="form-control" onChange={handleChange} />
      <div className="form-text">JPG, PNG or WEBP. Max 5MB.</div>
    </div>
  );
}
