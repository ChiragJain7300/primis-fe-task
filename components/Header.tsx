"use client"

import { Computer, DarkMode, LightMode } from '@mui/icons-material'
import { Box, Stack, Typography, IconButton, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ColorModeContext } from '@/theme/ThemeProvider'

function Header() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <Box sx={{ 
            py: { xs: 1.5, sm: 2.5 }, 
            px: { xs: 2, sm: 4, md: 6 }, 
            boxShadow: theme.palette.mode === 'dark' ? "0 4px 30px rgba(0, 0, 0, 0.5)" : "0 4px 30px rgba(0, 0, 0, 0.05)", 
            borderBottom: theme.palette.mode === 'dark' ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.3)",
            background: theme.palette.mode === 'dark' ? "rgba(18, 18, 18, 0.8)" : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 1100
        }}>
            <Stack sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Stack sx={{ gap: { xs: 1.5, sm: 2.5 }, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Computer sx={{ 
                        height: { xs: "28px", sm: "32px", md: "36px" }, 
                        width: { xs: "28px", sm: "32px", md: "36px" },
                        color: "primary.main",
                        filter: "drop-shadow(0px 2px 4px rgba(79, 70, 229, 0.3))"
                    }} />
                    <Typography variant="h4" sx={{ 
                        fontWeight: 800, 
                        fontSize: { xs: "1.35rem", sm: "1.6rem", md: "1.9rem", lg: "2.125rem" },
                        background: "linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        letterSpacing: "-0.5px"
                    }}>Primis Digital</Typography>
                </Stack>
                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                    <Typography variant="h5" sx={{ 
                        display: { xs: "none", sm: "block" }, 
                        fontWeight: 600, 
                        color: "text.secondary", 
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem", lg: "1.25rem" },
                        letterSpacing: "-0.3px"
                    }}>Frontend Task <Box component="span" sx={{ color: "primary.main", opacity: 0.8 }}>By Chirag Jain</Box></Typography>

                    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Header