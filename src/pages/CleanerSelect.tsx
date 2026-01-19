import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { glassCard, backgroundGradient } from "../styles/glass";
import { cleaners } from "../data/cleaners";

function getDraft() {
  const raw = localStorage.getItem("cc_booking_draft");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as any;
  } catch {
    return null;
  }
}

export default function CleanerSelect() {
  const navigate = useNavigate();
  const draft = getDraft();

  const [sort, setSort] = useState<"rating" | "jobs">("rating");

  const filtered = useMemo(() => {
    if (!draft?.service) return cleaners;

    const matches = cleaners.filter((c) => c.services.includes(draft.service));
    const sorted = [...matches].sort((a, b) => {
      if (sort === "jobs") return b.jobs - a.jobs;
      return b.rating - a.rating;
    });
    return sorted;
  }, [draft?.service, sort]);

  if (!draft) {
    return (
      <Box sx={backgroundGradient}>
        <Container maxWidth="sm">
          <Paper sx={{ ...glassCard, p: 5 }}>
            <Stack spacing={2} alignItems="center">
              <Typography variant="h5" fontWeight={900} color="white">
                No booking draft found
              </Typography>
              <Button component={Link} to="/book/new" variant="contained">
                Create a booking
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
              Choose a Cleaner
            </Typography>

            <Typography sx={{ color: "white", opacity: 0.85 }}>
              Service: <b>{draft.service}</b>
              <br />
              When: <b>{draft.date}</b> at <b>{draft.time}</b>
              <br />
              Area: <b>Randburg</b> · Suburb: <b>{draft.suburb}</b>
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant={sort === "rating" ? "contained" : "outlined"}
                sx={{
                  fontWeight: 800,
                  color: "white",
                  borderColor: "rgba(255,255,255,0.35)",
                  background:
                    sort === "rating"
                      ? "linear-gradient(135deg, rgba(0,122,255,0.85), rgba(77,163,255,0.85))"
                      : "transparent",
                }}
                onClick={() => setSort("rating")}
              >
                Sort: Rating
              </Button>

              <Button
                size="small"
                variant={sort === "jobs" ? "contained" : "outlined"}
                sx={{
                  fontWeight: 800,
                  color: "white",
                  borderColor: "rgba(255,255,255,0.35)",
                  background:
                    sort === "jobs"
                      ? "linear-gradient(135deg, rgba(52,199,89,0.85), rgba(126,224,129,0.85))"
                      : "transparent",
                }}
                onClick={() => setSort("jobs")}
              >
                Sort: Jobs
              </Button>
            </Stack>

            <Stack spacing={1.5}>
              {filtered.length === 0 ? (
                <Typography sx={{ color: "white", opacity: 0.85 }}>
                  No cleaners available for this service yet.
                </Typography>
              ) : (
                filtered.map((c) => (
                  <Paper
                    key={c.id}
                    sx={{
                      p: 2,
                      borderRadius: 18,
                      border: "1px solid rgba(255,255,255,0.18)",
                      background: "rgba(255,255,255,0.10)",
                      backdropFilter: "blur(18px)",
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Box>
                        <Typography sx={{ color: "white", fontWeight: 900, fontSize: 18 }}>
                          {c.name}
                        </Typography>
                        <Typography sx={{ color: "white", opacity: 0.8, fontSize: 13 }}>
                          ⭐ {c.rating.toFixed(1)} · {c.jobs} jobs · {c.suburb}
                        </Typography>
                        <Typography sx={{ color: "white", opacity: 0.75, fontSize: 12, mt: 0.5 }}>
                          Services: {c.services.join(", ")}
                        </Typography>
                      </Box>

                      <Button
                        variant="contained"
                        sx={{
                          fontWeight: 900,
                          background: "linear-gradient(135deg, #007aff, #34c759)",
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => {
                          localStorage.setItem("cc_selected_cleaner", JSON.stringify(c));
                          navigate("/confirm");
                        }}
                      >
                        Select
                      </Button>
                    </Stack>
                  </Paper>
                ))
              )}
            </Stack>

            <Button component={Link} to="/book/new" variant="text" sx={{ color: "rgba(255,255,255,0.85)" }}>
              Back to booking
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
