import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import IndiaFlag from "/images/flag-india.png";
import UAEFlag from "/images/flag-uae.png";
import LondonFlag from "/images/flag-london.png";
import USAFlag from "/images/flag-usa.png";

const WorldClockHorizontal = () => {
  const [times, setTimes] = useState({
    date: "",
    day: "",
    india: "",
    uae: "",
    london: "",
    usa: "",
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of images to rotate through (top-left corner)
  const rotatingImages = [
    "/images/gold-bars.jpg",
    "/images/silver-bars.jpg",
    "/images/gold-coin.avif",
    "/images/silver-coin.jpg",
  ];

  // Time zones configuration
  const timeZones = [

    {
      id: "uae",
      name: "UAE",
      flag: UAEFlag,
      timezone: "Asia/Dubai",
    },
    {
      id: "london",
      name: "LONDON",
      flag: LondonFlag,
      timezone: "Europe/London",
    },
    {
      id: "usa",
      name: "USA",
      flag: USAFlag,
      timezone: "America/New_York",
    },
    {
      id: "india",
      name: "INDIA",
      flag: IndiaFlag,
      timezone: "Asia/Kolkata",
    },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Date format: OCT 26, 2023
      const dateStr = now
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase();

      // Day of week
      const dayStr = now.toLocaleDateString("en-US", {
        weekday: "long",
      });

      // Time options
      const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      // Generate times for all timezones
      const newTimes = {
        date: dateStr,
        day: dayStr,
      };

      timeZones.forEach((zone) => {
        newTimes[zone.id] = now.toLocaleTimeString("en-US", {
          ...timeOptions,
          timeZone: zone.timezone,
        });
      });

      setTimes(newTimes);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Rotate images every 1.5 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % rotatingImages.length);
    }, 1500);
    return () => clearInterval(imageInterval);
  }, [rotatingImages.length]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1.5vw 2vw",
        width: "100%",
        mb: '2vw'
      }}
    >
      {/* Top Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "2.5vw",
        }}
      >
        {/* Rotating Image */}
        <Box
          sx={{
            width: "13.5vw",
            height: "5.2vw",
            borderRadius: "0.45vw",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 0.22vw 0.65vw rgba(0,0,0,0.3)",
          }}
        >
          <img
            src={rotatingImages[currentImageIndex]}
            alt="Rotating display"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        </Box>

        {/* Date & Day */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "2.5vw",
              fontWeight: 700,
              letterSpacing: "0.15vw",
              color: "#70DDF0",
              textShadow: "0 0.1vw 0.4vw rgba(0,0,0,0.5)",
            }}
          >
            {times.date || "— — —"}
          </Typography>
          <Typography
            sx={{
              fontSize: "2vw",
              fontWeight: 500,
              color: "#70DDF0",
              letterSpacing: "0.08vw",
            }}
          >
            {times.day || "———"}
          </Typography>
        </Box>
      </Box>

      {/* Bottom Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {timeZones.map((zone) => (
          <Box
            key={zone.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.8vw",
            }}
          >
            <img
              src={zone.flag}
              alt={zone.name}
              style={{
                width: "3.1vw",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <Box>
              <Typography
                sx={{
                  fontSize: "1.2vw",
                  fontWeight: 600,
                  color: "#70DDF0",
                  letterSpacing: "0.04vw",
                }}
              >
                {zone.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.3vw",
                  fontWeight: 500,
                  color: "#fff",
                }}
              >
                {times[zone.id] || "--:-- AM"}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WorldClockHorizontal;