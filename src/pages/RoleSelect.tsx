import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { glassCard, backgroundGradient } from "../styles/glass";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <Box sx={backgroundGradient}>
      <Container maxWidth="sm">
        <Paper sx={{ ...glassCard, p: 5 }}>
          <Stack spacing={4} alignItems="center">
            {/* Logo served from /public/logo.png */}
            <img
              src="/logo.png"
              alt="CleanConnects"
              style={{
                width: 240,
                filter: "drop-shadow(0 0 18px rgba(255,255,255,0.35))",
              }}
            />

            <Typography variant="h5" fontWeight={600} color="white" textAlign="center">
              Choose how you want to use the app
            </Typography>

            <Stack spacing={2} width="100%">
              <Button
                size="large"
                variant="contained"
                sx={{
                  py: 1.6,
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #007aff, #4da3ff)",
                }}
                onClick={() => navigate("/signup/customer")}
              >
                I NEED A CLEANER
              </Button>

              <Button
                size="large"
                variant="contained"
                sx={{
                  py: 1.6,
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #34c759, #7ee081)",
                }}
                onClick={() => navigate("/signup/cleaner")}
              >
                I’M A CLEANER
              </Button>
            </Stack>

            <Typography sx={{ fontSize: 12, opacity: 0.75, color: "white", textAlign: "center" }}>
              Safety-first MVP · Verification required
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
