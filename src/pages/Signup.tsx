import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { UserRole } from "../types/auth";
import { signUpDemo } from "../services/auth";
import { setRole as persistRole } from "../services/role";

function normalizeRole(roleParam: string | undefined): UserRole {
  return roleParam === "cleaner" ? "cleaner" : "customer";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone: string) {
  // Simple SA-friendly check (demo): allow +, digits, spaces
  const cleaned = phone.trim();
  return cleaned.length >= 9 && /^[+0-9\s-]+$/.test(cleaned);
}

export default function Signup() {
  const { role: roleParam } = useParams<{ role: string }>();
  const role = useMemo(() => normalizeRole(roleParam), [roleParam]);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [touched, setTouched] = useState(false);

  const title = role === "cleaner" ? "Cleaner" : "Customer";
  const subtitle =
    role === "cleaner"
      ? "Create your cleaner profile to start onboarding."
      : "Create your account to request a cleaning service.";

  const fullNameOk = fullName.trim().length >= 2;
  const emailOk = isValidEmail(email);
  const phoneOk = isValidPhone(phone);

  const formOk = fullNameOk && emailOk && phoneOk;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!formOk) return;

    // persist chosen role for the app
    persistRole(role);

    // demo signup (local storage). later: swap to Cognito
    signUpDemo({ role, fullName, email, phone });

    // go to verification status page
    navigate("/verification");
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "#f4ecd8",
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={800}>
              Sign up – {title}
            </Typography>

            <Typography sx={{ color: "#444" }}>{subtitle}</Typography>

            <Typography sx={{ fontSize: 13, color: "#333" }}>
              Safety-first MVP: bookings are locked until verification is complete.
            </Typography>

            <Box component="form" onSubmit={onSubmit}>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <TextField
                  label="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => setTouched(true)}
                  required
                  error={touched && !fullNameOk}
                  helperText={
                    touched && !fullNameOk ? "Please enter your full name." : " "
                  }
                />

                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  required
                  error={touched && !emailOk}
                  helperText={
                    touched && !emailOk ? "Enter a valid email address." : " "
                  }
                />

                <TextField
                  label="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => setTouched(true)}
                  required
                  placeholder="e.g. 081 234 5678"
                  error={touched && !phoneOk}
                  helperText={
                    touched && !phoneOk
                      ? "Enter a valid phone number."
                      : " "
                  }
                />

                <Button type="submit" variant="contained" size="large" disabled={!formOk}>
                  Create account
                </Button>

                <Button component={Link} to="/" variant="text">
                  Back
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
