import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { getCurrentUser, signOut } from "../services/auth";
import ProfileOrb from "./ProfileOrb";

export default function AppShell() {
  const user = getCurrentUser();
  const location = useLocation();
  const showBackHome = location.pathname !== "/";

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "rgba(15,15,15,0.35)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters sx={{ py: 1, display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ color: "white", fontWeight: 900, letterSpacing: 0.2 }}>
              CleanConnects
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {showBackHome && (
                <Button
                  component={RouterLink}
                  to="/"
                  variant="outlined"
                  sx={{ color: "white", borderColor: "rgba(255,255,255,0.35)" }}
                >
                  Home
                </Button>
              )}

              {user && (
                <>
                  <IconButton component={RouterLink} to="/profile" sx={{ p: 0.5 }}>
                    <ProfileOrb role={user.role} />
                  </IconButton>

                  <Button
                    onClick={() => {
                      signOut();
                      window.location.href = "/";
                    }}
                    variant="contained"
                    sx={{ fontWeight: 800 }}
                  >
                    Sign out
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />
    </Box>
  );
}
