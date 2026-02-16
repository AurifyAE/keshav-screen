import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
// import mainLogo from "/images/logo.svg";
import mainLogo from "/images/logo-new.svg";
import IndiaFlag from "/images/flag-india.png";
import UAEFlag from "/images/flag-uae.png";
import LondonFlag from "/images/flag-london.png";
import USAFlag from "/images/flag-usa.png";

const timeZones = [
    { id: "india", name: "INDIA", flag: IndiaFlag, timezone: "Asia/Kolkata" },
    { id: "uae", name: "UAE", flag: UAEFlag, timezone: "Asia/Dubai" },
    { id: "london", name: "LONDON", flag: LondonFlag, timezone: "Europe/London" },
    { id: "usa", name: "USA", flag: USAFlag, timezone: "America/New_York" },
];

const Logo = () => {
    const [times, setTimes] = useState({});

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const updatedTimes = {};

            timeZones.forEach((zone) => {
                updatedTimes[zone.id] = now.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: zone.timezone,
                });
            });

            setTimes(updatedTimes);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: 'column',
                alignItems: "center",
                mb: "2vw",
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    width: "43vw",
                }}
            >
                {/* Logo */}
                <img src={mainLogo} alt="Logo" style={{ width: "100%" }} />
            </Box>
            {/* World Times */}
            <Box
                sx={{
                    display: "flex",
                    width: '100%',
                    justifyContent: "space-evenly",
                    mt: "1.5vw",
                }}
            >
                {timeZones.map((zone) => (
                    <Box
                        key={zone.id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap:{
                                xs: "1vw",
                                md: "0.6vw"


                            },
                        }}
                    >
                        <img
                            src={zone.flag}
                            alt={zone.name}
                            style={{ width: 'clamp(35px,2.5vw,25px) ' }}
                        />

                        <Box>
                            <Typography
                                sx={{
                                    fontSize: {

                                        xs: "15px",
                                        md: "0.95vw"

                                    },
                                    fontWeight: 600,
                                    color: "#70DDF0",
                                }}
                            >
                                {zone.name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: {

                                        xs: "15px",
                                        md: "1.05vw"

                                    }, color: "#fff",
                                }}
                            >
                                {times[zone.id] || "--:--"}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Logo;
