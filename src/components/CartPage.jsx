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
  const { cart,increaseQty,decreaseQty,clearCart } = useCart();
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: ""
  });
  const navigate = useNavigate();
  const placeOrder = async () => {
  if (
    !address.name ||
    !address.phone ||
    !address.street ||
    !address.city ||
    !address.pincode
  ) {
    alert("Please fill all address fields");
    return;
  }

  try {
      const res = await API.post("/orders", {
  items: cart,
  address,
  totalAmount
});

const orderId = res.data.orderId;

// save to localStorage
const existingOrders =
  JSON.parse(localStorage.getItem("myOrders")) || [];

localStorage.setItem(
  "myOrders",
  JSON.stringify([...existingOrders, orderId])
);

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
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Your cart is empty</Typography>
      </Box>
    );
  }
  const totalAmount = cart.reduce(
  (sum, item) => sum + item.price * item.qty,
  0
  );

  return (
  <Box
    sx={{
      p: 3,
      display: "flex",
      justifyContent: "center"
    }}
  >
    {/* MAIN WRAPPER */}
    <Box
      sx={{
        width: "100%",
        maxWidth: 1000,
        display: "flex",
        gap: 5,
        alignItems: "flex-start"
      }}
    >
      {/* LEFT: CART ITEMS */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>

        {cart.map((item, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              borderRadius: 2,
              boxShadow: 2
            }}
          >
            <CardMedia
              component="img"
              image={item.image}
              sx={{
                width: 110,
                height: 110,
                objectFit: "cover"
              }}
            />

            <CardContent sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {item.title}
              </Typography>

              <Typography>
                ₹{item.price} × {item.qty}
              </Typography>

              <Typography fontWeight="bold">
                ₹{item.price * item.qty}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => decreaseQty(item.id)}
                >
                  -
                </Button>

                <Typography sx={{ mx: 2 }}>
                  {item.qty}
                </Typography>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => increaseQty(item.id)}
                >
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
            textAlign: "right"
          }}
        >
          Total: ₹{totalAmount.toLocaleString("en-IN")}
        </Typography>
      </Box>

      {/* RIGHT: DELIVERY ADDRESS */}
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            mt: 6,
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#fff",
            position: "sticky",
            top: 90
          }}
        >
          <Typography variant="h6" gutterBottom>
            Delivery Address
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <TextField
              size="small"
              label="Full Name"
              value={address.name}
              onChange={(e) =>
                setAddress({ ...address, name: e.target.value })
              }
              fullWidth
            />

            <TextField
              size="small"
              label="Phone Number"
              value={address.phone}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
              fullWidth
            />

            <TextField
              size="small"
              label="Street Address"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              fullWidth
            />

            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                size="small"
                label="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                fullWidth
              />

              <TextField
                size="small"
                label="Pincode"
                value={address.pincode}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
                fullWidth
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 3 }}
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