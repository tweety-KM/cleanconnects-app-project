import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { glassCard, backgroundGradient } from "../styles/glass";
import { createUser } from "../services/auth";

export default function Signup() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const normalizedRole = (role === "cleaner" ? "cleaner" : "customer") as "customer" | "cleaner";

  const accent =
    normalizedRole === "cleaner"
      ? "linear-gradient(135deg, #34c759, #7ee081)"
      : "linear-gradient(135deg, #007aff, #4da3ff)";

  const canContinue = useMemo(() => {
    return fullName.trim().length >= 2 && email.trim().includes("@");
  }, [fullName, email]);

  return (
    <Box sx={backgroundGradient}>
      <Container maxWidth="sm">
        <Paper sx={{ ...glassCard, p: 5 }}>
          <Stack spacing={2.5}>
            <Typography variant="h4" fontWeight={800} color="white">
              Create account
            </Typography>

            <Typography fontSize={14} color="white" sx={{ opacity: 0.85 }}>
              Signing up as a <b>{normalizedRole}</b>
            </Typography>

            <TextField
              label="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
              sx={{
                input: { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.35)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.6)" },
              }}
            />

            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
              sx={{
                input: { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.35)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.6)" },
              }}
            />

            <Button
              size="large"
              disabled={!canContinue}
              sx={{
                py: 1.5,
                fontWeight: 800,
                color: "white",
                background: accent,
                opacity: canContinue ? 1 : 0.55,
              }}
              onClick={() => {
                createUser({ fullName, email, role: normalizedRole });
                navigate("/verification");
              }}
            >
              Continue
            </Button>

            <Button
              variant="text"
              sx={{ color: "rgba(255,255,255,0.85)" }}
              onClick={() => navigate("/")}
            >
              Back
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
