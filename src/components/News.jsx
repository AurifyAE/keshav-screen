import React from "react";
import { Box, Typography } from "@mui/material";

const NewsTicker = ({ newsItems = [] }) => {
  // Ensure enough items for smooth scrolling
  const tickerItems =
    newsItems.length <= 1 ? Array(5).fill(newsItems[0]) : newsItems;

  return (
    <Box
      sx={{
        width: "100%",
        height: {

          xs: "5vw",
          md: "3vw"

        },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: " rgba(0,0,0,.4)",
        borderTop: "1px solid",
        backdropFilter: 'blur(15px)',

        borderImage:
          "linear-gradient(90deg,  #C9F89269,  #92F8C069, #B6E7FC57) 1",
      }}
    >
      {/* LEFT BRAND */}
      <Typography
        sx={{
          color: "#ffffff",
          background: "linear-gradient(180deg, rgba(0,0,0), rgba(20,20,20))",
          fontSize: {

            xs: "2vw",
            md: "1.2vw"

          },


          whiteSpace: "nowrap",
          padding: "0 1.5vw",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "1px solid",
          borderImage:
            "linear-gradient(90deg,  #C9F89269,  #92F8C069, #B6E7FC57) 1",
          flexShrink: 0,
        }}
      >
        KESHAV BULLION
      </Typography>

      {/* SCROLL AREA */}
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <Box
          sx={{
            height: '100%',
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            animation: "ticker 70s linear infinite",
          }}
        >
          {tickerItems.map((item, index) => (
            <Typography
              key={index}
              component="span"
              sx={{
                color: "#e6e6e6",
                fontSize: {

                  xs: "2vw",
                  md: "1.3vw"

                }, fontWeight: 500,
                whiteSpace: "nowrap",
                marginRight: "4vw",
              }}
            >
              {item?.description || ""}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* KEYFRAMES */}
      <style>
        {`
          @keyframes ticker {
            0% {
              transform: translateX(30%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default NewsTicker;
