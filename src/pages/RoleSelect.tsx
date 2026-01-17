import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { setRole } from "../services/role";
import logo from "../assets/logo.png";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "#0f0f0f",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            bgcolor: "#111",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Stack spacing={3} alignItems="center">

            {/* LOGO */}
            <Box
              component="img"
              src={logo}
              alt="CleanConnects logo"
              sx={{
                width: 140,
                height: "auto",
                mb: 1,
              }}
            />

            <Typography variant="h3" sx={{ color: "white", fontWeight: 700 }}>
              CleanConnects
            </Typography>

            <Typography sx={{ color: "rgba(255,255,255,0.7)", textAlign: "center" }}>
              Choose how you want to use the app
            </Typography>

            <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  setRole("customer");
                  navigate("/signup/customer");
                }}
              >
                I need a cleaner
              </Button>

              <Button
                size="large"
                variant="outlined"
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
                onClick={() => {
                  setRole("cleaner");
                  navigate("/signup/cleaner");
                }}
              >
                I’m a cleaner
              </Button>
            </Stack>

            <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
              Safety-first MVP. Verification required before bookings.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
