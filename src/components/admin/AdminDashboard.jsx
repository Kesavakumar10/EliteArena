import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <button className="admin-dashboard__button" onClick={() => navigate("/admin/add-product")}>
        Add Product
      </button>
    </div>
  );
}
