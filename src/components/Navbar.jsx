import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/Cart';
// import { getUserRole } from "../utils/auth";
import { useLocation, useNavigate } from 'react-router-dom';

const pages = ['Home','Products','Contact'];

export default function Navbar({ setPage, activePage, setActivePage, goToProducts, openCart }) {
  const navigate = useNavigate();
  // const role = getUserRole();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElSettings, setAnchorElSettings] = React.useState(null);
  const [animateCart, setAnimateCart] = React.useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const isAdminPage = location.pathname.startsWith("/admin");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const closeNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

 React.useEffect(() => {
  if (cart.length > 0) {
    setAnimateCart(true);

    const timer = setTimeout(() => {
      setAnimateCart(false);
    }, 400); // animation duration

    return () => clearTimeout(timer);
  }
  }, [cart.length]);

  return (
    <AppBar position="static" sx={{ backgroundColor: "orange" }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
                fontFamily: "'Alex Brush', cursive",
                fontWeight: 600,
                fontSize: "2.3rem",
                lineHeight: 1,
                m: 0,
                color: "white"
                }}
            >
            EliteArena
          </Typography>

          {/* Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {pages.map(page => (
              <Button
                key={page}
                onClick={() => {
                  setPage(page);
                  setActivePage(page);
                  openCart(false);
                }}
                sx={{
                  color: activePage === page ? "black" : "white",
                  backgroundColor: activePage === page ? "white" : "transparent",
                  borderRadius: 2
                }}
              >
                {page}
              </Button>            
            ))}
            
            <Button
              sx={{ color: "white" }}
              onClick={(e) => setAnchorElSettings(e.currentTarget)}
            >
            Settings
            </Button>

            <Menu
              anchorEl={anchorElSettings}
              open={Boolean(anchorElSettings)}
              onClose={() => setAnchorElSettings(null)}
            >
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

            {/* LOGOUT – only when logged in */}
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

            <Button onClick={() => navigate("/my-orders")} sx={{color: 'white'}}>
            Orders
            </Button>

            {!isAdminPage && !token && (
  <IconButton
    color="inherit"
    onClick={() => openCart(true)}
    sx={{
      transform: animateCart ? "scale(1.3)" : "scale(1)",
      transition: "transform 0.3s ease"
    }}
  >
    <ShoppingCartIcon />
    {totalItems > 0 && (
      <span
        style={{
          marginLeft: "6px",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#fff"
        }}
      >
        {totalItems}
      </span>
    )}
  </IconButton>
)}

          </Box>

          {/* Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>

            <Menu
  anchorEl={anchorElNav}
  open={Boolean(anchorElNav)}
  onClose={closeNavMenu}
>
  {/* HOME */}
  <MenuItem
    onClick={() => {
      setPage("Home");
      setActivePage("Home");
      closeNavMenu();
    }}
  >
    Home
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
