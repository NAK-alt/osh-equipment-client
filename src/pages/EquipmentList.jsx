import { useEffect, useState } from "react";
import EquipmentCard from "../components/EquipmentCard";
import { getAllEquipment } from "../api/equipmentApi";

export default function EquipmentList() {
  const [equipment, setEquipment] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEquipment()
      .then(setEquipment)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = equipment.filter((item) =>
    `${item.equipmentName}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="container mt-4">Loading equipment...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Equipment Inventory</h3>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search equipment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row">
        {filtered.length === 0 ? (
          <p className="text-muted">No equipment found.</p>
        ) : (
          filtered.map((item) => <EquipmentCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}
