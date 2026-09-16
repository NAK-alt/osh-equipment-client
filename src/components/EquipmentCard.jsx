import { Link } from "react-router-dom";
import { normalizeEquipmentStatus } from "../utils/equipmentStatus";
import { imageUrl } from "../utils/imageUrl";

const statusColors = {
  Available: "success",
  "Out of Stock": "danger",
};

export default function EquipmentCard({ item }) {
  const status = normalizeEquipmentStatus(item.status);

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={imageUrl(item.imagePath)}
          className="card-img-top"
          alt={item.equipmentName}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{item.equipmentName}</h5>
          <span className={`badge bg-${statusColors[status] || "secondary"} mb-2 align-self-start`}>
            {status}
          </span>
          <p className="mb-1 small">
            Available: <strong>{item.availableQuantity}</strong> / {item.totalQuantity}
          </p>
          <Link to={`/equipment/${item.id}`} className="btn btn-primary btn-sm mt-auto">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
