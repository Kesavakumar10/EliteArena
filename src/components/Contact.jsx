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
        p: 3
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 500,
          width: "100%",
          p: 4,
          borderRadius: 3,
          textAlign: "center"
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Contact Us
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Need help or have a question?  
          We’d love to hear from you.
        </Typography>

        <Stack spacing={2}>
          <Typography fontSize="16px">
            📧 <strong>Email:</strong> support@gamingvault.com
          </Typography>

          <Typography fontSize="16px">
            📞 <strong>Phone:</strong> +91 98765 43210
          </Typography>

          <Typography fontSize="16px">
            📍 <strong>Location:</strong> Nagercoil, Tamil Nadu, India
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
