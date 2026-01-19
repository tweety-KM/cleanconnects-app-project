import { Box, Button, Stack, Typography } from "@mui/material";

type Props = {
  value: string; // "HH:MM"
  onChange: (t: string) => void;
  accent: "blue" | "green";
};

const slots = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00",
];

export default function TimeSlots({ value, onChange, accent }: Props) {
  const ring =
    accent === "green"
      ? "linear-gradient(135deg, rgba(52,199,89,0.9), rgba(126,224,129,0.9))"
      : "linear-gradient(135deg, rgba(0,122,255,0.9), rgba(77,163,255,0.9))";

  return (
    <Box>
      <Typography sx={{ color: "white", fontWeight: 800, mb: 1 }}>Time</Typography>

      <Stack direction="row" flexWrap="wrap" gap={1}>
        {slots.map((t) => {
          const active = t === value;
          return (
            <Button
              key={t}
              onClick={() => onChange(t)}
              sx={{
                borderRadius: 999,
                px: 2,
                py: 1,
                color: "white",
                fontWeight: 900,
                border: "1px solid rgba(255,255,255,0.22)",
                background: active ? ring : "rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
                boxShadow: active ? "0 12px 26px rgba(0,0,0,0.25)" : "none",
              }}
            >
              {t}
            </Button>
          );
        })}
      </Stack>

      <Typography sx={{ mt: 1, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
        Availability matching comes next.
      </Typography>
    </Box>
  );
}
