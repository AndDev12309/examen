import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Azul principal
      light: "#63a4ff",
      dark: "#004ba0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#dc004e", // Rojo secundario
      light: "#ff5c8d",
      dark: "#9a0036",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f4f6f8", // Color de fondo general
      paper: "#ffffff", // Color de fondo para tarjetas
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: `'Roboto', sans-serif`,
    h1: { fontSize: "2.5rem", fontWeight: 700 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    h3: { fontSize: "1.75rem", fontWeight: 500 },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
    button: { textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Evita mayúsculas en botones
          borderRadius: "8px", // Bordes redondeados
          padding: "8px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "16px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
});

export default theme;
