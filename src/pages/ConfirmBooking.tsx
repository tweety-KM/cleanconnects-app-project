import { Link } from "react-router-dom";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { glassCard, backgroundGradient } from "../styles/glass";

function getDraft() {
  const raw = localStorage.getItem("cc_booking_draft");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as any;
  } catch {
    return null;
  }
}

function getCleaner() {
  const raw = localStorage.getItem("cc_selected_cleaner");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as any;
  } catch {
    return null;
  }
}

export default function ConfirmBooking() {
  const draft = getDraft();
  const cleaner = getCleaner();

  if (!draft || !cleaner) {
    return (
      <Box sx={backgroundGradient}>
        <Container maxWidth="sm">
          <Paper sx={{ ...glassCard, p: 5 }}>
            <Stack spacing={2} alignItems="center">
              <Typography variant="h5" fontWeight={900} color="white">
                Missing booking details
              </Typography>
              <Button component={Link} to="/book/new" variant="contained">
                Start again
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
          <Stack spacing={2.5}>
            <Typography variant="h4" fontWeight={900} color="white">
              Confirm booking
            </Typography>

            <Typography sx={{ color: "white", opacity: 0.9 }}>
              Cleaner: <b>{cleaner.name}</b> (⭐ {cleaner.rating})
              <br />
              Service: <b>{draft.service}</b>
              <br />
              Date: <b>{draft.date}</b> · Time: <b>{draft.time}</b>
              <br />
              Suburb: <b>{draft.suburb}</b>
              <br />
              Address: <b>{draft.addressLine}</b>
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                fontWeight: 900,
                background: "linear-gradient(135deg, #007aff, #34c759)",
              }}
              onClick={() => {
                // Save final demo booking
                const finalBooking = { ...draft, cleaner };
                localStorage.setItem("cc_booking_final", JSON.stringify(finalBooking));
                alert("Booking confirmed (demo). Next: payment + messaging + tracking.");
              }}
            >
              Confirm (Demo)
            </Button>

            <Button component={Link} to="/dashboard" variant="text" sx={{ color: "rgba(255,255,255,0.85)" }}>
              Back to dashboard
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
