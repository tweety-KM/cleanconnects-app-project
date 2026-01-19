import { Paper, Stack, Typography } from "@mui/material";
import { glassCard } from "../styles/glass";

export default function ReviewModal() {
  return (
    <Paper sx={{ ...glassCard, p: 4 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h6" color="white">
          How was your experience?
        </Typography>

        <Typography color="white" opacity={0.8}>
          ⭐ ⭐ ⭐ ⭐ ⭐
        </Typography>
      </Stack>
    </Paper>
  );
}
