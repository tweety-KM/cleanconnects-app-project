import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { glassCard, backgroundGradient } from "../styles/glass";
import { getCurrentUser, setVerificationStatus, signOut } from "../services/auth";

export default function Verification() {
  const user = getCurrentUser();

  if (!user) {
    return (
      <Box sx={backgroundGradient}>
        <Container maxWidth="sm">
          <Paper sx={{ ...glassCard, p: 5 }}>
            <Stack spacing={2} alignItems="center">
              <Typography variant="h5" fontWeight={800} color="white">
                No session
              </Typography>
              <Button variant="contained" onClick={() => (window.location.href = "/")}>
                Go Home
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={backgroundGradient}>
      <Container maxWidth="sm">
        <Paper sx={{ ...glassCard, p: 5 }}>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h5" fontWeight={800} color="white">
              Verification Center
            </Typography>

            <Typography sx={{ color: "white", opacity: 0.85, textAlign: "center" }}>
              Bookings are locked until you are <b>VERIFIED</b>.
            </Typography>

            <Typography sx={{ color: "white", opacity: 0.85 }}>
              Current status: <b>{user.verificationStatus}</b>
            </Typography>

            <Stack spacing={1.5} sx={{ width: "100%", mt: 1 }}>
              <Button
                variant="contained"
                sx={{ fontWeight: 700, background: "linear-gradient(135deg, #34c759, #7ee081)" }}
                onClick={() => {
                  setVerificationStatus("VERIFIED");
                  window.location.href = "/dashboard";
                }}
              >
                Mark as VERIFIED (Demo)
              </Button>

              <Button
                variant="contained"
                sx={{ fontWeight: 700, background: "linear-gradient(135deg, #ff3b30, #ff7b72)" }}
                onClick={() => setVerificationStatus("REJECTED")}
              >
                Mark as REJECTED (Demo)
              </Button>

              <Button
                variant="outlined"
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.35)" }}
                onClick={() => {
                  signOut();
                  window.location.href = "/";
                }}
              >
                Sign out
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
