import { useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const btnStyle = {
  padding: "10px",
  width: "100%",
  background: "#00b894",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default function AdminAddProduct() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    stock: ""
  });

  const navigate = useNavigate();
  const handle = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      await API.post("/products", {
        ...form,
        category: form.category.toLowerCase()
    });
      alert("Product added");

      setForm({
        title: "",
        price: "",
        image: "",
        category: "",
        stock: ""
      });
      navigate("/products");
    } 
    catch {
      alert("Admin access only");
    }
  };

  return (
  <div style={{ padding: 30, maxWidth: 400 }}>
    <h2>Add Product (Admin)</h2>

    <input
      name="title"
      value={form.title}
      placeholder="Product Title"
      onChange={handle}
      style={inputStyle}
    />

    <input
      name="price"
      value={form.price}
      type="number"
      placeholder="Price"
      onChange={handle}
      style={inputStyle}
    />

    <input
      name="image"
      value={form.image}
      placeholder="Paste Image URL"
      onChange={handle}
      style={inputStyle}
    />

    {/* IMAGE PREVIEW */}
    {form.image && (
      <img
        src={form.image}
        alt="preview"
        style={{
          width: "100%",
          height: 150,
          objectFit: "cover",
          marginTop: 10,
          borderRadius: 6
        }}
      />
    )}

    <select
      name="category"
      value={form.category}
      onChange={handle}
      style={inputStyle}
    >
      <option value="">Select Category</option>
      <option value="Keyboard">Keyboard</option>
      <option value="Mouse">Mouse</option>
      <option value="Headset">Headset</option>
      <option value="Chair">Chair</option>
      <option value="Controller">Controller</option>
      <option value="Mousepad">MousePad</option>
      <option value="CPU">CPU</option>
      <option value="Monitor">Monitor</option>
    </select>
    <input
      name="stock"
      value={form.stock}
      type="number"
      placeholder="Stock"
      onChange={handle}
      style={inputStyle}
    />

    <button onClick={submit} style={btnStyle}>
      Add Product
    </button>
  </div>
);
}
