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

const categories = ["all", "keyboard", "mouse", "headset", "chair", "controller", "mousepad", "cpu", "monitor"];

export default function ProductGrid({ category, openCart }) {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(category || "all");

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

  useEffect(() => {
    setSelectedCategory(category || "all");
  }, [category]);

  const filtered =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category && p.category.toLowerCase() === selectedCategory);

  return (
    <Box sx={{ px: { xs: 1.5, sm: 2.5, md: 3 }, py: { xs: 2, md: 3 } }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 800, fontSize: { xs: "1.75rem", md: "2.125rem" } }}
      >
        Products
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 3,
          overflowX: "auto",
          pb: 1,
          mx: { xs: -1.5, sm: 0 },
          px: { xs: 1.5, sm: 0 },
          scrollbarWidth: "thin",
        }}
      >
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(cat)}
            sx={{
              flex: "0 0 auto",
              minWidth: "max-content",
              borderRadius: 999,
              textTransform: "none",
              backgroundColor: selectedCategory === cat ? "#ff8c00" : "orange",
              color: "white",
              border: "1px solid orange",
              "&:hover": {
                backgroundColor: "#ffb347",
                border: "1px solid orange",
              },
            }}
          >
            {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Button>
        ))}
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {filtered.length === 0 ? (
          <Typography sx={{ p: 2 }}>No products available</Typography>
        ) : (
          filtered.map((prod) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={prod._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  border: "1px solid var(--brand-line)",
                  boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 14px 30px rgba(15,23,42,0.14)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={prod.image}
                  alt={prod.title}
                  sx={{
                    height: { xs: 180, md: 200 },
                    objectFit: "contain",
                    p: { xs: 1.5, md: 2 },
                    backgroundColor: "#f8fafc",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />

                <CardContent sx={{ textAlign: "center", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <Typography sx={{ fontWeight: 700, minHeight: 48 }}>{prod.title}</Typography>

                  <Typography fontWeight="bold">INR {Number(prod.price).toLocaleString("en-IN")}</Typography>

                  <Button
                    fullWidth
                    sx={{
                      mt: "auto",
                      backgroundColor: "var(--brand-success)",
                      color: "#fff",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#008f68" },
                    }}
                    onClick={() => addToCart({ ...prod, id: prod._id })}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    fullWidth
                    sx={{
                      mt: 1,
                      backgroundColor: "var(--brand-blue)",
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
