import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { getCurrentUser } from "../services/auth";

const SERVICE_AREA = "Randburg";

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
  "Laundry Assist",
  "Move-in / Move-out Clean",
] as const;

export default function BookingNew() {
  const user = getCurrentUser();

  const [service, setService] = useState<(typeof services)[number]>("Standard Clean");
  const [suburb, setSuburb] = useState<(typeof randburgAreas)[number]>("Ferndale");
  const [addressLine, setAddressLine] = useState("");
  const [date, setDate] = useState(""); // YYYY-MM-DD
  const [time, setTime] = useState(""); // HH:MM

  const canBook = useMemo(() => {
    return (
      !!user &&
      user.verificationStatus === "VERIFIED" &&
      addressLine.trim().length >= 5 &&
      date.length > 0 &&
      time.length > 0
    );
  }, [user, addressLine, date, time]);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", bgcolor: "#f4ecd8" }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={900}>
              New Booking
            </Typography>

            <Typography sx={{ color: "#333" }}>
              Service area is limited to <b>{SERVICE_AREA}</b> for the MVP.
            </Typography>

            <TextField
              select
              label="Service"
              value={service}
              onChange={(e) => setService(e.target.value as any)}
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
            >
              {randburgAreas.map((a) => (
                <MenuItem key={a} value={a}>
                  {a}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Address line (street + number)"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              placeholder="e.g. 12 Example Street"
            />

            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <TextField
                fullWidth
                label="Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Stack>

            <Button variant="contained" size="large" disabled={!canBook}>
              Continue (Demo)
            </Button>

            <Typography sx={{ fontSize: 12, color: "#555" }}>
              Note: This is a demo screen. Next we’ll implement cleaner matching + availability.
            </Typography>

            <Button component={Link} to="/dashboard" variant="text">
              Back to dashboard
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
