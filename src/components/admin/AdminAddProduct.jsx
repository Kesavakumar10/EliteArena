import { useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "./AdminAddProduct.css";

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
  <div className="admin-add-product-page">
    <div className="admin-add-product">
      <div className="admin-add-product__header">
        <h2>Add Product</h2>
        <p>Fill the product details and publish it to the store.</p>
      </div>

      <input
        name="title"
        value={form.title}
        placeholder="Product Title"
        onChange={handle}
        className="admin-add-product__input"
      />

      <input
        name="price"
        value={form.price}
        type="number"
        placeholder="Price"
        onChange={handle}
        className="admin-add-product__input"
      />

      <input
        name="image"
        value={form.image}
        placeholder="Paste Image URL"
        onChange={handle}
        className="admin-add-product__input"
      />

      {form.image && (
        <div className="admin-add-product__preview-wrap">
          <img
            src={form.image}
            alt="preview"
            className="admin-add-product__preview"
          />
        </div>
      )}

      <select
        name="category"
        value={form.category}
        onChange={handle}
        className="admin-add-product__input"
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
        className="admin-add-product__input"
      />

      <button onClick={submit} className="admin-add-product__button">
        Add Product
      </button>
    </div>
  </div>
);
}
