// components/HomePage.jsx
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Grid from "@mui/material/Grid";
export default function HomePage({ goToProducts }) {

  const carouselItems = [
    { id: 1, img: "https://wallpapercave.com/wp/wp9356292.jpg" },
    { id: 2, img: "https://cdn.luxatic.com/wp-content/uploads/2021/03/Less-is-More-Game-Decor-scaled.jpg" },
    { id: 3, img: "https://www.costco.co.uk/medias/sys_master/images/had/hdc/172382189748254.jpg" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ width: "100%", overflowY: "auto", p: 2 }}>

      {/* Carousel */}
      <Slider {...sliderSettings}>
        {carouselItems.map(item => (
          <Box
            key={item.id}
            sx={{
              position: "relative",
              height: { xs: "400px", sm: "500px", md: "600px" }
            }}
          >
            <img
              src={item.img}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px"
              }}
            />
          </Box>
        ))}
      </Slider>

      <Box
        sx={{
          mt: 6,
          textAlign: "center"
        }}
      >
        <Typography variant="h4" fontWeight= "bold" gutterBottom>
          Level Up Your Gaming Setup
        </Typography>

        <Typography variant="h6" sx={{ mb: 3, color: "gray" }}>
          Premium gaming accessories built for performance and comfort.
        </Typography>

          
      </Box>
      <Grid container spacing={10} sx={{ mt: 8 }}>
      {[
        { title: "Top Quality", desc: "Only premium gaming gear" },
        { title: "Fast Delivery", desc: "Quick & reliable shipping" },
        { title: "Best Prices", desc: "Competitive market rates" },
        { title: "Gamer Approved", desc: "Tested by real gamers" },
      ].map((item, i) => (
      <Grid item xs={12} sm={6} md={3} key={i}>
      <Box
        sx={{
          p: 8,
          textAlign: "center",
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {item.title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
          {item.desc}
        </Typography>
      </Box>
    </Grid>
  ))}
    </Grid>
    <Box
      sx={{
        mt: 10,
        height: 300,
        borderRadius: 3,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1606813907291-d86efa9b94db)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Box sx={{ bgcolor: "rgba(0,0,0,0.6)", p: 4, borderRadius: 2 }}>
      <Typography variant="h4" color="white" gutterBottom>
      Build Your Ultimate Gaming Station
      </Typography>
      <Button variant="contained" onClick={() => goToProducts()}>
        Shop Now
      </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 10, textAlign: "center" }}>
    <Typography variant="h4" gutterBottom>
      What Gamers Say
    </Typography>

    <Typography sx={{ maxWidth: 600, mx: "auto", color: "gray" }}>
      “GamingVault completely upgraded my setup. Quality is insane!”
    </Typography>

    <Typography sx={{ mt: 2, fontWeight: "bold" }}>
    — Pro Gamer
    </Typography>
    </Box>
    <Box sx={{ mt: 12, mb: 8, textAlign: "center" }}>
    <Typography variant="h4" gutterBottom>
      Ready to Upgrade?
    </Typography>

    <Button
      variant="contained"
      size="large"
      sx={{ px: 6, py: 1.5 }}
      onClick={() => goToProducts()}
    >
    Explore All Products →
    </Button>
    </Box>
  </Box>
  );
}
