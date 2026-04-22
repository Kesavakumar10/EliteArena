import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import API from "../utils/api";
import { useCart } from "../context/Cart";

export default function ProductGrid({ openCart }) {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };
    loadProducts();
  }, []);

  const filtered =
  selectedCategory === "all"
    ? products
    : products.filter(
        p =>
          p.category &&
          p.category === selectedCategory
      );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        {["all", "keyboard", "mouse", "headset","chair","controller","mousepad","cpu","monitor"].map(cat => (
          <Button
            key={cat}
            // variant={selectedCategory === cat ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(cat)}
            sx={{
              backgroundColor:
              selectedCategory === cat ? "white" : "orange",
              color:
              selectedCategory === cat ? "black" : "white",
              border: "1px solid orange",
              "&:hover": {
              backgroundColor:
              selectedCategory === cat ? "white" : "#ffb347",
              },
            }}
          >
            {cat === "all" ? "ALL" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Button>
        ))}
      </Box>

      <Grid container spacing={3}>
        {filtered.length === 0 ? (
          <Typography sx={{ p: 2 }}>
            No products available
          </Typography>
        ) : (
          filtered.map((prod) => (
            <Grid size = {{xs:12, sm:6, md:4, lg:3}} key={prod._id}>
              <Card sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": {
                boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
                transform: "translateY(-4px)",
                },
              }}>
                <CardMedia
                  component="img"
                  image={prod.image}
                  alt={prod.title}
                  sx={{
                    height: 200,
                    objectFit: "contain",
                    p: 2,
                    backgroundColor: "#f8f9fa",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />

                <CardContent sx={{ textAlign: "center" }}>
                  <Typography>{prod.title}</Typography>

                  <Typography fontWeight="bold">
                    ₹{prod.price}
                  </Typography>

                  <Button
                    fullWidth
                    sx={{
                      mt: 1,
                      backgroundColor: "#00b894",
                      color: "#fff",
                      fontWeight: "bold"
                    }}
                    onClick={() =>
                      addToCart({ ...prod, id: prod._id })
                    }
                  >
                    Add to Cart
                  </Button>

                <Button
                  fullWidth
                  sx={{
                    mt: 1,
                    backgroundColor: "#4830ff",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: 2,
                    py: 1,
                    "&:hover": {
                    backgroundColor: "#18349a",
                    },
                  }}
                  onClick={() => {
                  addToCart({ ...prod, id: prod._id });
                  openCart(true);
                  }}
                >
                Buy Now
                </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
