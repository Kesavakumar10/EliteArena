import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useCart } from "../context/Cart";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, clearCart } = useCart();
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });
  const navigate = useNavigate();

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const placeOrder = async () => {
    if (!address.name || !address.phone || !address.street || !address.city || !address.pincode) {
      alert("Please fill all address fields");
      return;
    }

    try {
      const res = await API.post("/orders", {
        items: cart,
        address,
        totalAmount,
      });

      const orderId = res.data.orderId;
      const existingOrders = JSON.parse(localStorage.getItem("myOrders")) || [];

      localStorage.setItem("myOrders", JSON.stringify([...existingOrders, orderId]));

      alert("Order placed successfully!");
      clearCart();
      navigate("/my-orders");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Order failed");
    }
  };

  if (cart.length === 0) {
    return (
      <Box sx={{ px: { xs: 2, md: 4 }, py: 5, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold">
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, bgcolor: "var(--brand-orange)", "&:hover": { bgcolor: "var(--brand-orange-dark)" } }}
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 1.5, sm: 2.5, md: 3 }, py: { xs: 2, md: 3 }, display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 5 },
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ flex: 2, width: "100%" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 800, fontSize: { xs: "1.75rem", md: "2.125rem" } }}
          >
            Your Cart
          </Typography>

          {cart.map((item) => (
            <Card
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" },
                mb: 2,
                borderRadius: 2,
                border: "1px solid var(--brand-line)",
                boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{
                  width: { xs: "100%", sm: 120 },
                  height: { xs: 170, sm: 120 },
                  objectFit: "contain",
                  backgroundColor: "#f8fafc",
                  p: 1.5,
                }}
              />

              <CardContent sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.title}
                </Typography>

                <Typography color="text.secondary">
                  INR {Number(item.price).toLocaleString("en-IN")} x {item.qty}
                </Typography>

                <Typography fontWeight="bold">
                  INR {Number(item.price * item.qty).toLocaleString("en-IN")}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
                  <Button variant="outlined" size="small" onClick={() => decreaseQty(item.id)} sx={{ minWidth: 42 }}>
                    -
                  </Button>

                  <Typography sx={{ minWidth: 28, textAlign: "center", fontWeight: 700 }}>{item.qty}</Typography>

                  <Button variant="outlined" size="small" onClick={() => increaseQty(item.id)} sx={{ minWidth: 42 }}>
                    +
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}

          <Typography
            variant="h5"
            sx={{
              mt: 3,
              fontWeight: "bold",
              textAlign: { xs: "left", sm: "right" },
            }}
          >
            Total: INR {totalAmount.toLocaleString("en-IN")}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, width: "100%" }}>
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              boxShadow: "0 12px 30px rgba(15,23,42,0.1)",
              border: "1px solid var(--brand-line)",
              backgroundColor: "#fff",
              position: { xs: "static", md: "sticky" },
              top: 90,
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Delivery Address
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <TextField
                size="small"
                label="Full Name"
                value={address.name}
                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                fullWidth
              />

              <TextField
                size="small"
                label="Phone Number"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                fullWidth
              />

              <TextField
                size="small"
                label="Street Address"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                fullWidth
              />

              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1 }}>
                <TextField
                  size="small"
                  label="City"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  fullWidth
                />

                <TextField
                  size="small"
                  label="Pincode"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  fullWidth
                />
              </Box>
            </Box>

            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 3, py: 1.2 }}
              onClick={placeOrder}
            >
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
