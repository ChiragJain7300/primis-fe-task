"use client"

import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material"
import { ReactNode, createContext, useState, useMemo, useEffect } from "react"
import { getDesignTokens } from "./theme"

// 1. Create a Context so any component can toggle the theme
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    // 2. Load the user's preference on initial render
    useEffect(() => {
        if(typeof window === 'undefined') return;
        const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
        if (savedMode) {
            setMode(savedMode);
        } else {
            // Check system preference if no saved mode exists
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setMode(prefersDarkMode ? 'dark' : 'light');
        }
    }, []);

    // 3. Create the toggle function
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem('themeMode', newMode); // Save to local storage
                    return newMode;
                });
            },
        }),
        [],
    );

    // 4. Generate the theme based on the current mode
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline /> 
                {children}
            </MuiThemeProvider>
        </ColorModeContext.Provider>
    )
}