import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { isLikelyAndroidTV } from "../utils/tv";

const WorldClockHorizontal = () => {
  const tvSafe = isLikelyAndroidTV();
  const [dateInfo, setDateInfo] = useState({
    date: "",
    day: "",
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Keep this list limited to known-existing assets for stability on TVs.
  // Missing images can cause continuous 404s (especially with frequent rotation).
  const rotatingImages = ["/images/background2.webp", "/images/background2.png"];

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();

      const dateStr = now
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase();

      const dayStr = now.toLocaleDateString("en-US", {
        weekday: "long",
      });

      setDateInfo({ date: dateStr, day: dayStr });
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % rotatingImages.length);
    }, tvSafe ? 10000 : 4000);
    return () => clearInterval(imageInterval);
  }, [tvSafe]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1.5vw 2vw",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Date & Day */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1vw",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "4vw",
                md: "2vw",
              },
              fontWeight: 700,
              letterSpacing: "0.15vw",
              color: "#70DDF0",
            }}
          >
            {dateInfo.date || "— — —"}
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: "3vw",
                md: "1.5vw",
              },
              fontWeight: 500,
              color: "#C8F1F8",
            }}
          >
            {dateInfo.day || "———"}
          </Typography>
        </Box>

        {/* Rotating Image */}
        <Box
          sx={{
            width: { xs: "25vw", md: "16vw" },
            height: { xs: "14vw", md: "7vw" },
            borderRadius: "0.45vw",
            overflow: "hidden",
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
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WorldClockHorizontal;
