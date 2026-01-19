import { useMemo } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function iso(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const weekday = ["S", "M", "T", "W", "T", "F", "S"];

type Props = {
  value: string; // YYYY-MM-DD
  onChange: (isoDate: string) => void;
  accent: "blue" | "green";
};

export default function CalendarGrid({ value, onChange, accent }: Props) {
  const today = new Date();
  const selected = value ? new Date(value + "T00:00:00") : null;

  const viewMonth = useMemo(() => {
    return selected ? startOfMonth(selected) : startOfMonth(today);
  }, [value]);

  const monthLabel = useMemo(() => {
    return viewMonth.toLocaleString(undefined, { month: "long", year: "numeric" });
  }, [viewMonth]);

  const { days, leadingEmpty } = useMemo(() => {
    const start = startOfMonth(viewMonth);
    const end = endOfMonth(viewMonth);

    const leading = start.getDay();
    const arr: Date[] = [];
    for (let d = 1; d <= end.getDate(); d++) arr.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));

    return { days: arr, leadingEmpty: leading };
  }, [viewMonth]);

  const ring =
    accent === "green"
      ? "linear-gradient(135deg, rgba(52,199,89,0.9), rgba(126,224,129,0.9))"
      : "linear-gradient(135deg, rgba(0,122,255,0.9), rgba(77,163,255,0.9))";

  const canSelect = (d: Date) => {
    const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const d0 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return d0 >= t0;
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Button
          size="small"
          variant="text"
          sx={{ color: "rgba(255,255,255,0.85)" }}
          onClick={() => onChange("")}
        >
          Clear
        </Button>

        <Typography sx={{ color: "white", fontWeight: 800, letterSpacing: 0.3 }}>
          {monthLabel}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            sx={{ color: "white", borderColor: "rgba(255,255,255,0.35)" }}
            onClick={() => {
              const base = selected ?? today;
              const d = new Date(base.getFullYear(), base.getMonth() - 1, Math.min(base.getDate(), 28));
              onChange(iso(d));
            }}
          >
            ‹
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{ color: "white", borderColor: "rgba(255,255,255,0.35)" }}
            onClick={() => {
              const base = selected ?? today;
              const d = new Date(base.getFullYear(), base.getMonth() + 1, Math.min(base.getDate(), 28));
              onChange(iso(d));
            }}
          >
            ›
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={{
          p: 2,
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.22)",
          background: "rgba(0,0,0,0.12)",
          backdropFilter: "blur(18px)",
        }}
      >
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, mb: 1 }}>
          {weekday.map((w) => (
            <Typography key={w} sx={{ color: "rgba(255,255,255,0.75)", fontSize: 12, textAlign: "center" }}>
              {w}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
          {Array.from({ length: leadingEmpty }).map((_, i) => (
            <Box key={`e-${i}`} />
          ))}

          {days.map((d) => {
            const disabled = !canSelect(d);
            const selectedHere = selected ? isSameDay(d, selected) : false;
            const todayHere = isSameDay(d, today);

            return (
              <Button
                key={d.toISOString()}
                disabled={disabled}
                onClick={() => onChange(iso(d))}
                sx={{
                  minWidth: 0,
                  py: 1.1,
                  borderRadius: 14,
                  color: "white",
                  fontWeight: 800,
                  opacity: disabled ? 0.35 : 1,
                  border: todayHere ? "1px solid rgba(255,255,255,0.35)" : "1px solid rgba(255,255,255,0.12)",
                  background: selectedHere ? ring : "rgba(255,255,255,0.06)",
                  boxShadow: selectedHere ? "0 10px 24px rgba(0,0,0,0.25)" : "none",
                }}
              >
                {d.getDate()}
              </Button>
            );
          })}
        </Box>
      </Box>

      <Typography sx={{ mt: 1, fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
        Tip: This MVP blocks past dates.
      </Typography>
    </Box>
  );
}
