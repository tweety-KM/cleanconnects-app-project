import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { glassCard, backgroundGradient } from "../styles/glass";
import { getCurrentUser } from "../services/auth";
import CalendarGrid from "../components/CalendarGrid";
import TimeSlots from "../components/TimeSlots";

const randburgAreas = [
  "Ferndale",
  "Blairgowrie",
  "Bordeaux",
  "Cresta",
  "Northcliff",
  "Robindale",
  "Randpark Ridge",
  "Olivedale",
] as const;

const services = [
  "Standard Clean",
  "Deep Clean",
  "Car Wash",
  "Laundry Assist",
  "Carpet Cleaning",
  "Couch Cleaning",
  "Move-in / Move-out Clean",
  "Garden Cleanup",
] as const;

export default function BookingNew() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [service, setService] = useState<(typeof services)[number]>("Standard Clean");
  const [suburb, setSuburb] = useState<(typeof randburgAreas)[number]>("Ferndale");
  const [addressLine, setAddressLine] = useState("");
  const [date, setDate] = useState(""); // YYYY-MM-DD
  const [time, setTime] = useState(""); // HH:MM
  const [notes, setNotes] = useState("");

  const accentKey = user?.role === "cleaner" ? "green" : "blue";
  const accent =
    accentKey === "green"
      ? "linear-gradient(135deg, #34c759, #7ee081)"
      : "linear-gradient(135deg, #007aff, #4da3ff)";

  const canContinue = useMemo(() => {
    return addressLine.trim().length >= 5 && date.length > 0 && time.length > 0;
  }, [addressLine, date, time]);

  const handleContinue = () => {
    const bookingDraft = {
      service,
      suburb,
      addressLine: addressLine.trim(),
      date,
      time,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      areaConstraint: "Randburg-only MVP",
    };

    localStorage.setItem("cc_booking_draft", JSON.stringify(bookingDraft));

    // ✅ Go to cleaner selection instead of showing alert
    navigate("/cleaners");
  };

  return (
    <Box sx={backgroundGradient}>
      <Container maxWidth="sm">
        <Paper sx={{ ...glassCard, p: 5 }}>
          <Stack spacing={2.5}>
            <Typography variant="h4" fontWeight={900} color="white">
              New Booking
            </Typography>

            <Typography fontSize={13} color="white" sx={{ opacity: 0.85 }}>
              Randburg-only MVP · Choose a service, date, and time.
            </Typography>

            <TextField
              select
              label="Service"
              value={service}
              onChange={(e) => setService(e.target.value as any)}
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.35)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.6)" },
                "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.8)" },
                "& .MuiSelect-select": { color: "white" },
              }}
            >
              {services.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Randburg suburb"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value as any)}
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.35)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.6)" },
                "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.8)" },
                "& .MuiSelect-select": { color: "white" },
              }}
            >
              {randburgAreas.map((a) => (
                <MenuItem key={a} value={a}>
                  {a}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Address line"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              placeholder="e.g. 12 Example Street"
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
              sx={{
                input: { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.35)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.6)" },
              }}
            />

            {/* ✅ Glass calendar */}
            <CalendarGrid value={date} onChange={setDate} accent={accentKey} />

            {/* ✅ Glass time chips */}
            <TimeSlots value={time} onChange={setTime} accent={accentKey} />

            <TextField
              label="Extra notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              minRows={3}
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
              sx={{
                textarea: { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.35)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.6)" },
              }}
            />

            <Button
              size="large"
              disabled={!canContinue}
              onClick={handleContinue}
              sx={{
                py: 1.5,
                fontWeight: 900,
                color: "white",
                background: accent,
                opacity: canContinue ? 1 : 0.55,
              }}
            >
              Continue
            </Button>

            <Button
              component={Link}
              to="/dashboard"
              variant="text"
              sx={{ color: "rgba(255,255,255,0.85)" }}
            >
              Back to Dashboard
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
