import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useCart } from "../context/Cart";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const pages = ["Home", "Products", "Contact"];

export default function Navbar({ setPage, activePage, setActivePage, openCart }) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElSettings, setAnchorElSettings] = React.useState(null);
  const [animateCart, setAnimateCart] = React.useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const isAdminPage = location.pathname.startsWith("/admin");

  const closeNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToPage = (page) => {
    setPage(page);
    setActivePage(page);
    openCart(false);

    if (page === "Products") navigate("/products");
    if (page === "Contact") navigate("/contact");
    if (page === "Home") navigate("/");
  };

  React.useEffect(() => {
    if (cart.length > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cart.length]);

  const cartButton = (
    <IconButton
      color="inherit"
      aria-label="Open cart"
      onClick={() => openCart(true)}
      sx={{
        transform: animateCart ? "scale(1.2)" : "scale(1)",
        transition: "transform 0.3s ease",
      }}
    >
      <Badge badgeContent={totalItems} color="error">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );

  return (
    <AppBar position="sticky" elevation={2} sx={{ backgroundColor: "orange", top: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", gap: 1, minHeight: { xs: 64, md: 72 } }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Alex Brush', cursive",
              fontWeight: 600,
              fontSize: { xs: "1.85rem", sm: "2.2rem", md: "2.3rem" },
              lineHeight: 1,
              m: 0,
              color: "white",
              whiteSpace: "nowrap",
            }}
          >
            EliteArena
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => goToPage(page)}
                sx={{
                  color: "white",
                  backgroundColor: activePage === page ? "#ff8c00" : "transparent",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: activePage === page ? "#ff8c00" : "#ffb347",
                  },
                }}
              >
                {page}
              </Button>
            ))}

            <Button sx={{ color: "white" }} onClick={(e) => setAnchorElSettings(e.currentTarget)}>
              Settings
            </Button>

            <Menu anchorEl={anchorElSettings} open={Boolean(anchorElSettings)} onClose={() => setAnchorElSettings(null)}>
              <MenuItem
                onClick={() => {
                  if (!token) {
                    navigate("/login");
                  } else {
                    navigate("/admin");
                  }
                  setAnchorElSettings(null);
                }}
              >
                Admin
              </MenuItem>

              {token && (
                <MenuItem
                  onClick={() => {
                    logout();
                    setAnchorElSettings(null);
                  }}
                >
                  Logout
                </MenuItem>
              )}
            </Menu>

            <Button onClick={() => navigate("/my-orders")} sx={{ color: "white" }}>
              Orders
            </Button>

            {!isAdminPage && cartButton}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 0.5 }}>
            {!isAdminPage && cartButton}

            <IconButton onClick={(event) => setAnchorElNav(event.currentTarget)} color="inherit" aria-label="Open menu">
              <MenuIcon />
            </IconButton>

            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={closeNavMenu}>
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    goToPage(page);
                    closeNavMenu();
                  }}
                >
                  {page}
                </MenuItem>
              ))}

              <MenuItem
                onClick={() => {
                  navigate("/my-orders");
                  closeNavMenu();
                }}
              >
                Orders
              </MenuItem>

              <MenuItem
                onClick={() => {
                  if (!token) {
                    navigate("/login");
                  } else {
                    navigate("/admin");
                  }
                  closeNavMenu();
                }}
              >
                Admin
              </MenuItem>

              {token && (
                <MenuItem
                  onClick={() => {
                    logout();
                    closeNavMenu();
                  }}
                >
                  Logout
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
