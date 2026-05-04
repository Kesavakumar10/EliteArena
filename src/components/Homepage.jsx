import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Grid from "@mui/material/Grid";
import "./Homepage.css";

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
    <Box sx={{ width: "100%", overflowY: "auto", px: { xs: 1.5, sm: 2.5, md: 3 }, py: 2 }}>
      <Slider {...sliderSettings}>
        {carouselItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              position: "relative",
              height: { xs: "260px", sm: "420px", md: "560px" },
            }}
          >
            <img src={item.img} alt="" className="homepage-carousel-image" />
          </Box>
        ))}
      </Slider>

      <Box sx={{ mt: { xs: 4, md: 6 }, textAlign: "center" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: { xs: "1.8rem", md: "2.125rem" } }}
        >
          Level Up Your Gaming Setup
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: 3, color: "var(--brand-muted)", fontSize: { xs: "1rem", md: "1.25rem" } }}
        >
          Premium gaming accessories built for performance and comfort.
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mt: { xs: 4, md: 8 } }}>
        {[
          { title: "Top Quality", desc: "Only premium gaming gear" },
          { title: "Fast Delivery", desc: "Quick and reliable shipping" },
          { title: "Best Prices", desc: "Competitive market rates" },
          { title: "Gamer Approved", desc: "Tested by real gamers" },
        ].map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
            <Box
              sx={{
                p: { xs: 3, md: 5 },
                textAlign: "center",
                borderRadius: 2,
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                backgroundColor: "#fff",
                border: "1px solid var(--brand-line)",
                height: "100%",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "var(--brand-muted)" }}>
                {item.desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: { xs: 5, md: 10 },
          minHeight: { xs: 260, md: 320 },
          borderRadius: 2,
          backgroundImage: "url(https://images.unsplash.com/photo-1606813907291-d86efa9b94db)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "rgba(0,0,0,0.66)",
            p: { xs: 3, md: 4 },
            borderRadius: 2,
            width: { xs: "calc(100% - 32px)", sm: "auto" },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            color="white"
            gutterBottom
            sx={{ fontSize: { xs: "1.55rem", md: "2.125rem" } }}
          >
            Build Your Ultimate Gaming Station
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--brand-orange)", "&:hover": { bgcolor: "#ffb347" } }}
            onClick={() => goToProducts()}
          >
            Shop Now
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: { xs: 6, md: 10 }, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.6rem", md: "2.125rem" } }}>
          What Gamers Say
        </Typography>

        <Typography sx={{ maxWidth: 600, mx: "auto", color: "var(--brand-muted)" }}>
          "EliteArena completely upgraded my setup. Quality is insane!"
        </Typography>

        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
          - Pro Gamer
        </Typography>
      </Box>

      <Box sx={{ mt: { xs: 7, md: 12 }, mb: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.7rem", md: "2.125rem" } }}>
          Ready to Upgrade?
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{ px: { xs: 3, sm: 6 }, py: 1.5, bgcolor: "var(--brand-blue)", "&:hover": { bgcolor: "#18349a" } }}
          onClick={() => goToProducts()}
        >
          Explore All Products
        </Button>
      </Box>
    </Box>
  );
}
