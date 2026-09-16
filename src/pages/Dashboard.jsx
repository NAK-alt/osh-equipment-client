import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getAllEquipment } from "../api/equipmentApi";
import { normalizeEquipmentStatus } from "../utils/equipmentStatus";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEquipment()
      .then(setEquipment)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container mt-4">Loading dashboard...</div>;

  const totalItems = equipment.length;
  const outOfStock = equipment.filter((e) => normalizeEquipmentStatus(e.status) === "Out of Stock").length;
  const available = equipment.filter((e) => normalizeEquipmentStatus(e.status) === "Available").length;

  const chartData = {
    labels: ["Available", "Out of Stock"],
    datasets: [
      {
        data: [available, outOfStock],
        backgroundColor: ["#198754", "#dc3545"],
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Dashboard</h3>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h6>Total Equipment</h6>
            <h3>{totalItems}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h6>Available</h6>
            <h3 className="text-success">{available}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h6>Out of Stock</h6>
            <h3 className="text-danger">{outOfStock}</h3>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-5">
          <div className="card p-3 shadow-sm">
            <h6 className="text-center">Stock Status Overview</h6>
            <Doughnut data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}
