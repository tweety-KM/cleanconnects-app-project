import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: ["Inter", "system-ui", "Segoe UI", "Arial", "sans-serif"].join(","),
    h3: { fontWeight: 900, letterSpacing: -0.5 },
    h4: { fontWeight: 900, letterSpacing: -0.3 },
  },
  shape: {
    borderRadius: 16,
  },
  palette: {
    mode: "dark",
    background: {
      default: "#0b0f14",
      paper: "rgba(255,255,255,0.10)",
    },
    primary: {
      main: "#2D9CDB", // blue
    },
    secondary: {
      main: "#27AE60", // green
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: "rgba(0,0,0,0.10)",
          backdropFilter: "blur(12px)",
        },
        notchedOutline: {
          borderColor: "rgba(255,255,255,0.22)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          textTransform: "none",
          fontWeight: 800,
          paddingTop: 12,
          paddingBottom: 12,
        },
      },
    },
  },
});
