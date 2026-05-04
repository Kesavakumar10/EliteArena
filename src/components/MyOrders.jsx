import { useEffect, useState } from "react";
import API from "../utils/api";
import { Box, Typography, Card, CardContent, CardMedia, Divider } from "@mui/material";
import Navbar from "./Navbar";
import CartPage from "./CartPage";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [page, setPage] = useState("Orders");

  useEffect(() => {
    const orderIds = JSON.parse(localStorage.getItem("myOrders")) || [];

    if (orderIds.length === 0) return;

    API.post("/orders/guest", { orderIds })
      .then((res) => setOrders(res.data))
      .catch(console.error);
  }, []);

  if (orders.length === 0) {
    return (
      <>
        <Navbar setPage={setPage} activePage={page} setActivePage={setPage} openCart={setShowCart} />
        {showCart ? (
          <CartPage />
        ) : (
          <Box sx={{ px: { xs: 2, md: 4 }, py: 5 }}>
            <Typography>No orders found</Typography>
          </Box>
        )}
      </>
    );
  }

  return (
    <>
      <Navbar setPage={setPage} activePage={page} setActivePage={setPage} openCart={setShowCart} />
      {showCart ? (
        <CartPage />
      ) : (
        <Box sx={{ px: { xs: 1.5, sm: 2.5, md: 4 }, py: { xs: 2, md: 4 } }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 800, fontSize: { xs: "1.75rem", md: "2.125rem" } }}
          >
            My Orders
          </Typography>

          {orders.map((order) => (
            <Card
              key={order._id}
              sx={{
                mb: 3,
                borderRadius: 2,
                border: "1px solid var(--brand-line)",
                boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ overflowWrap: "anywhere" }}>
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
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                      mb: 2,
                      alignItems: { xs: "stretch", sm: "center" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.title}
                      sx={{
                        width: { xs: "100%", sm: 90 },
                        height: { xs: 150, sm: 90 },
                        objectFit: "contain",
                        backgroundColor: "#f8fafc",
                        borderRadius: 1,
                        p: 1,
                      }}
                    />

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight="bold">{item.title}</Typography>
                      <Typography variant="body2">Qty: {item.qty}</Typography>
                      <Typography variant="body2">Price: INR {Number(item.price).toLocaleString("en-IN")}</Typography>
                    </Box>

                    <Typography fontWeight="bold">
                      INR {Number(item.price * item.qty).toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ mt: 2, mb: 1 }} />

                <Typography variant="h6" align="right" fontWeight="bold">
                  Total: INR {Number(order.totalAmount).toLocaleString("en-IN")}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
}
