import { Box } from "@mui/material";

export default function ProfileOrb({ role }: { role: "customer" | "cleaner" }) {
  const glow =
    role === "cleaner"
      ? "linear-gradient(135deg, rgba(52,199,89,0.85), rgba(126,224,129,0.55))"
      : "linear-gradient(135deg, rgba(0,122,255,0.85), rgba(77,163,255,0.55))";

  return (
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: glow,
        position: "relative",
        boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.35)",
        backdropFilter: "blur(14px)",
        overflow: "hidden",
      }}
    >
      {/* glass highlight */}
      <Box
        sx={{
          position: "absolute",
          top: 4,
          left: 6,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.35)",
          filter: "blur(1px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -8,
          right: -10,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.14)",
          filter: "blur(1px)",
        }}
      />
    </Box>
  );
}
