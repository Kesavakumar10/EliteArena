import { useEffect, useState } from "react";
import API from "../utils/api";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider
} from "@mui/material";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const orderIds =
      JSON.parse(localStorage.getItem("myOrders")) || [];

    if (orderIds.length === 0) return;

    API.post("/orders/guest", { orderIds })
      .then((res) => setOrders(res.data))
      .catch(console.error);
  }, []);

  if (orders.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>No orders found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      {orders.map((order) => (
        <Card
          key={order._id}
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Order ID: {order._id}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              Ordered on: {new Date(order.createdAt).toLocaleDateString()}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {order.items.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 2,
                  alignItems: "center"
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  sx={{
                    width: 90,
                    height: 90,
                    objectFit: "cover",
                    borderRadius: 1
                  }}
                />

                <Box sx={{ flexGrow: 1 }}>
                  <Typography fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2">
                    Qty: {item.qty}
                  </Typography>
                  <Typography variant="body2">
                    Price: ₹{item.price}
                  </Typography>
                </Box>

                <Typography fontWeight="bold">
                  ₹{item.price * item.qty}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ mt: 2, mb: 1 }} />

            <Typography
              variant="h6"
              align="right"
              fontWeight="bold"
            >
              Total: ₹{order.totalAmount.toLocaleString("en-IN")}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
