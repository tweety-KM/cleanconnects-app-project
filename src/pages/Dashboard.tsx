import { Link } from "react-router-dom";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { glassCard, backgroundGradient } from "../styles/glass";
import { getCurrentUser, signOut } from "../services/auth";

export default function Dashboard() {
  const user = getCurrentUser();

  return (
    <Box sx={backgroundGradient}>
      <Container maxWidth="sm">
        <Paper sx={{ ...glassCard, p: 5 }}>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h4" fontWeight={800} color="white">
              MVP Dashboard
            </Typography>

            {user ? (
              <Typography sx={{ color: "white", opacity: 0.85, textAlign: "center" }}>
                Welcome, <b>{user.fullName}</b> · Status: <b>{user.verificationStatus}</b>
              </Typography>
            ) : (
              <Typography sx={{ color: "white", opacity: 0.85 }}>
                No user session found.
              </Typography>
            )}

            <Button
              component={Link}
              to="/book/new"
              size="large"
              variant="contained"
              sx={{
                py: 1.4,
                width: "100%",
                fontWeight: 700,
                background: "linear-gradient(135deg, #007aff, #34c759)",
              }}
            >
              Request a clean (Randburg MVP)
            </Button>

            <Button
              variant="outlined"
              sx={{ width: "100%", color: "white", borderColor: "rgba(255,255,255,0.35)" }}
              onClick={() => {
                signOut();
                window.location.href = "/";
              }}
            >
              Sign out
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
