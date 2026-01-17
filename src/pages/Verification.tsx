import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { getCurrentUser, setVerificationStatus, signOut } from "../services/auth";

export default function Verification() {
  const nav = useNavigate();
  const user = getCurrentUser();

  if (!user) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", bgcolor: "#f4ecd8" }}>
        <Container maxWidth="sm">
          <Paper sx={{ p: 4 }}>
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={800}>
                No account found
              </Typography>
              <Typography>Please sign up first.</Typography>
              <Button component={Link} to="/" variant="contained">
                Go to start
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    );
  }

  const status = user.verificationStatus;

  const statusText =
    status === "PENDING_VERIFICATION"
      ? "Pending verification"
      : status === "VERIFIED"
      ? "Verified"
      : status === "REJECTED"
      ? "Rejected"
      : "Suspended";

  const statusColor =
    status === "VERIFIED" ? "#1b5e20" : status === "PENDING_VERIFICATION" ? "#8a6d1d" : "#7a1c1c";

  const canProceed = status === "VERIFIED";

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", bgcolor: "#f4ecd8" }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={900}>
              Verification
            </Typography>

            <Typography>
              Hi <b>{user.fullName}</b> ({user.role})
            </Typography>

            <Typography sx={{ fontWeight: 800, color: statusColor }}>
              Status: {statusText}
            </Typography>

            <Typography sx={{ fontSize: 13, color: "#333" }}>
              Bookings are locked until you are verified. This is a safety-first MVP.
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
              {/* Demo buttons so you can test states quickly.
                  Later this becomes admin actions + background check provider webhooks. */}
              <Button size="small" variant="outlined" onClick={() => { setVerificationStatus("PENDING_VERIFICATION"); nav(0); }}>
                Set PENDING
              </Button>
              <Button size="small" variant="outlined" onClick={() => { setVerificationStatus("VERIFIED"); nav(0); }}>
                Set VERIFIED
              </Button>
              <Button size="small" variant="outlined" onClick={() => { setVerificationStatus("REJECTED"); nav(0); }}>
                Set REJECTED
              </Button>
              <Button size="small" variant="outlined" onClick={() => { setVerificationStatus("SUSPENDED"); nav(0); }}>
                Set SUSPENDED
              </Button>
            </Stack>

            <Button
              variant="contained"
              size="large"
              disabled={!canProceed}
              onClick={() => nav("/dashboard")}
            >
              Continue
            </Button>

            <Button
              variant="text"
              color="inherit"
              onClick={() => {
                signOut();
                nav("/");
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
