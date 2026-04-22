import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 30 }}>
      <h1>Admin Dashboard</h1>

      <button
        style={{
          padding: "10px 20px",
          background: "#00b894",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          marginTop: 20
        }}
        onClick={() => navigate("/admin/add-product")}
      >
        ➕ Add Product
      </button>
    </div>
  );
}
