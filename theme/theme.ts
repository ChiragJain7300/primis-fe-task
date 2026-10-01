import { createTheme, PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
    typography: {
        fontFamily: "'Outfit', sans-serif",
    },
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // Light mode colors
                primary: {
                    main: "#4F46E5", 
                    dark: "#3730A3",
                    light: "#818CF8",
                },
                background: {
                    default: "#FAFAFA",
                    paper: "#FFFFFF",
                },
                text: {
                    primary: "#111827",
                    secondary: "#4B5563"
                }
            }
            : {
                // Dark mode colors
                primary: {
                    main: "#818CF8", // Lighter indigo for dark mode
                    dark: "#4F46E5",
                    light: "#C7D2FE",
                },
                background: {
                    default: "#121212",
                    paper: "#1E1E1E",
                },
                text: {
                    primary: "#FFFFFF",
                    secondary: "#9CA3AF"
                }
            }),
    }
});