import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { glassCard, backgroundGradient } from "../styles/glass";
import { getCurrentUser } from "../services/auth";

export default function Profile() {
  const user = getCurrentUser();

  return (
    <Box sx={backgroundGradient}>
      <Container maxWidth="sm">
        <Paper sx={{ ...glassCard, p: 5 }}>
          <Stack spacing={1.5}>
            <Typography variant="h4" fontWeight={900} color="white">
              Profile
            </Typography>

            {user ? (
              <>
                <Typography sx={{ color: "white", opacity: 0.9 }}>
                  <b>Name:</b> {user.fullName}
                </Typography>
                <Typography sx={{ color: "white", opacity: 0.9 }}>
                  <b>Email:</b> {user.email}
                </Typography>
                <Typography sx={{ color: "white", opacity: 0.9 }}>
                  <b>Role:</b> {user.role}
                </Typography>
                <Typography sx={{ color: "white", opacity: 0.9 }}>
                  <b>Verification:</b> {user.verificationStatus}
                </Typography>
              </>
            ) : (
              <Typography sx={{ color: "white", opacity: 0.85 }}>
                No user session found.
              </Typography>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
