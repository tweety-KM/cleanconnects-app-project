import React from "react";
import { Box, Button, Modal, Paper, Stack, TextField, Typography } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: { rating: number; comment: string }) => void;
};

export default function ReviewModal({ open, onClose, onSubmit }: Props) {
  const [rating, setRating] = React.useState<number>(5);
  const [comment, setComment] = React.useState<string>("");

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: 520,
            p: 3,
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(15,15,15,0.65)",
            backdropFilter: "blur(18px)",
            color: "white",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={900}>
              Leave a Review (Demo)
            </Typography>

            <Typography sx={{ color: "white", opacity: 0.8 }}>
              This is a placeholder UI for portfolio purposes.
            </Typography>

            <TextField
              label="Rating (1–5)"
              type="number"
              value={rating}
              onChange={(e) => setRating(Math.max(1, Math.min(5, Number(e.target.value))))}
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
              sx={{
                input: { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.35)" },
              }}
            />

            <TextField
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              minRows={3}
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
              sx={{
                textarea: { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.35)" },
              }}
            />

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button
                variant="outlined"
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.35)" }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ fontWeight: 900, background: "linear-gradient(135deg, #007aff, #34c759)" }}
                onClick={() => onSubmit({ rating, comment })}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Modal>
  );
}
