import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

export default function Contact() {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 1.5, sm: 3 },
        py: 5,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 560,
          width: "100%",
          p: { xs: 2.5, sm: 4 },
          borderRadius: 2,
          textAlign: "center",
          border: "1px solid var(--brand-line)",
          boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: "1.75rem", md: "2.125rem" } }}>
          Contact Us
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Need help or have a question? We'd love to hear from you.
        </Typography>

        <Stack spacing={2}>
          <Typography fontSize="16px">
            <strong>Email:</strong> support@elitearena.com
          </Typography>

          <Typography fontSize="16px">
            <strong>Phone:</strong> +91 98765 43210
          </Typography>

          <Typography fontSize="16px">
            <strong>Location:</strong> Nagercoil, Tamil Nadu, India
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
