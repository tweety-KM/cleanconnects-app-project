import { Link } from "react-router-dom";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { getCurrentUser, signOut } from "../services/auth";

export default function Dashboard() {
  const user = getCurrentUser();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", bgcolor: "#0f0f0f" }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ p: 4, bgcolor: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Stack spacing={2}>
            <Typography variant="h4" sx={{ color: "white", fontWeight: 900 }}>
              MVP Dashboard
            </Typography>

            {user ? (
              <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>
                Welcome, <b>{user.fullName}</b>. You are <b>{user.verificationStatus}</b>.
              </Typography>
            ) : (
              <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>
                No user session found.
              </Typography>
            )}

            <Button component={Link} to="/book/new" variant="contained" size="large">
              Request a clean (Randburg MVP)
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
        </Paper>
      </Container>
    </Box>
  );
}
