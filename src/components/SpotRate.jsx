import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";
import { isLikelyAndroidTV } from "../utils/tv";


const SpotRate = () => {
  const { goldData, silverData, platinumData } = useSpotRate();
  const tvSafe = isLikelyAndroidTV();



  const [goldBidDir, setGoldBidDir] = useState("neutral");
  const [goldAskDir, setGoldAskDir] = useState("neutral");
  const [silverBidDir, setSilverBidDir] = useState("neutral");
  const [silverAskDir, setSilverAskDir] = useState("neutral");
  const [platinumBidDir, setplatinumBidDir] = useState("neutral");
  const [platinumAskDir, setplatinumAskDir] = useState("neutral");

  const prev = useRef({
    goldBid: null,
    goldAsk: null,
    silverBid: null,
    silverAsk: null,
    platinumBid: null,
    platinumAsk: null,
  });

  const neutralTimeouts = useRef({
    goldBid: null,
    goldAsk: null,
    silverBid: null,
    silverAsk: null,
    platinumBid: null,
    platinumAsk: null,
  });

  const scheduleNeutral = (key, setDir) => {
    const existing = neutralTimeouts.current[key];
    if (existing) clearTimeout(existing);
    neutralTimeouts.current[key] = setTimeout(() => {
      setDir("neutral");
      neutralTimeouts.current[key] = null;
    }, 800);
  };

  const detectChange = (key, prevVal, currVal, setDir) => {
    const prevNum =
      prevVal === null || prevVal === undefined ? null : Number(prevVal);
    const currNum =
      currVal === null || currVal === undefined ? null : Number(currVal);

    if (currNum === null || Number.isNaN(currNum)) return prevVal;
    if (prevNum === null || Number.isNaN(prevNum)) return currNum;

    if (currNum > prevNum) {
      setDir("rise");
      scheduleNeutral(key, setDir);
    } else if (currNum < prevNum) {
      setDir("fall");
      scheduleNeutral(key, setDir);
    }

    return currNum;
  };

  useEffect(() => {
    prev.current.goldBid = detectChange(
      "goldBid",
      prev.current.goldBid,
      goldData.bid,
      setGoldBidDir
    );
  }, [goldData.bid]);

  useEffect(() => {
    prev.current.goldAsk = detectChange(
      "goldAsk",
      prev.current.goldAsk,
      goldData.ask,
      setGoldAskDir
    );
  }, [goldData.ask]);

  useEffect(() => {
    prev.current.silverBid = detectChange(
      "silverBid",
      prev.current.silverBid,
      silverData.bid,
      setSilverBidDir
    );
  }, [silverData.bid]);

  useEffect(() => {
    prev.current.silverAsk = detectChange(
      "silverAsk",
      prev.current.silverAsk,
      silverData.ask,
      setSilverAskDir
    );
  }, [silverData.ask]);
  useEffect(() => {
    prev.current.platinumBid = detectChange(
      "platinumBid",
      prev.current.platinumBid,
      platinumData.bid,
      setplatinumBidDir
    );
  }, [platinumData.bid]);

  useEffect(() => {
    prev.current.platinumAsk = detectChange(
      "platinumAsk",
      prev.current.platinumAsk,
      platinumData.ask,
      setplatinumAskDir
    );
  }, [platinumData.ask]);

  useEffect(() => {
    return () => {
      for (const id of Object.values(neutralTimeouts.current)) {
        if (id) clearTimeout(id);
      }
    };
  }, []);



  const getColors = (dir) => {
    if (dir === "rise") return { bgColor: "#00ff9d", border: "1px solid #00ff9d" };
    if (dir === "fall") return { bgColor: "#ff3366", border: " 1px solid #ff3366" };
    return { bgColor: "#F0F8FF00", border: " 1px solid #FFFFFF" };
  };

  const PricePulse = ({ label, value, dir }) => {
    const { bgColor, border } = getColors(dir);
    const hasPulse = dir !== "neutral";

    return (
      <Box
        sx={{
          position: "relative",
          flex: 1,
          mb: '1vw',

          overflow: "hidden",
          ...(hasPulse && {
            animation: dir === "rise" ? "pulseRise 0.8s ease-out" : "pulseFall 0.8s ease-out",
            bgcolor: dir === "rise" ? "0 0 0 0 rgba(0,255,157,0.6)" : "0 0 0 0 rgba(255,51,102,0.6)",
          }),
        }}
      >
        <Typography
          sx={{
            // fontSize: "1vw",

            fontSize: {
              xs: "3vw",   // mobile
              sm: "2.5vw",   // small tablets
              md: "1.8vw",   // laptops
              lg: "1vw",   // desktop
              xl: "1vw",   // large screens
            },
            fontWeight: 600,
            letterSpacing: "0.25vw",
            color: "#CBD8F7",
            mb: '0.5vw',
            textShadow: "0 0 0.8vw #5577FF86",
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            // fontSize: "2.4vw",
            fontSize: {
              xs: "3vw",   // mobile
              sm: "2.5vw",   // small tablets
              md: "1.8vw",   // laptops
              lg: "2.4vw",   // desktop
              xl: "2.4vw",   // large screens
            },
            fontWeight: 800,
            letterSpacing: "0.18vw",
            textAlign: "center",
            bgcolor: bgColor,
            color: 'white',
            border: border,
            borderRadius: '.5vw',
            fontVariantNumeric: "tabular-nums",
            transition: "all 0.4s ease",
          }}
        >
          {value}
        </Typography>


      </Box>
    );
  };

  const MetalPanel = ({ data, bidDir, askDir, theme }) => {
    const isGold = theme === "gold";
    const isSilver = theme === "silver";
    const isPlatinum = theme === "platinum";


    let title = "GOLD";
    let gradient = "linear-gradient(90deg, #ffe066, #ffd700, #ffbb33)";
    let shadow = "0 0 3vw rgba(255 217 0 / 0.11) inset";
    let borderColor = "#FFD90052";


    if (isSilver) {
      title = "SILVER";
      gradient = "linear-gradient(90deg, #aaa, #fff, #aaa)";
      shadow = "0 0 3vw rgba(160,180,255,0.15) inset";
      borderColor = "#A0A0FF8E";
    } else if (isPlatinum) {
      title = "PLATINUM";
      gradient = "linear-gradient(90deg, #c0c0c0, #e0e0e0, #ffffff)";
      shadow = "0 0 3vw rgba(172 172 172 / 0.24) inset";
      borderColor = "#D0D0FF70";
    }

    return (
      <Box
        sx={{
          position: "relative",
          bgcolor: "linear-gradient(135deg, #0f0f1a 0%, #05050f 100%)",
          border: "0.1vw solid rgba(60,60,90,0.4)",
          overflow: "hidden",
          display: 'grid',
          gap: '1.5vw',
          padding: { xs: ' 2vw 1vw', md: ' 0.5vw 1vw' },
          gridTemplateColumns: '0.8fr 1fr 1fr',
          borderRadius: '1vw',
          boxShadow: "0 0.8vw 3.2vw rgba(0,0,0,0.7)",
          ...(tvSafe ? {} : { backdropFilter: "blur(0.4vw)" }),
          ...(isGold || isSilver || isPlatinum ? { boxShadow: shadow } : {}),
        }}
      >

        <Typography
          sx={{

            fontSize: {
              xs: "3vw",   // mobile
              sm: "2.5vw",   // small tablets
              md: "1.8vw",   // laptops
              lg: "1.6vw",   // desktop
              xl: "1.4vw",   // large screens
            },

            fontWeight: 800,
            letterSpacing: "0.1vw",
            background: gradient,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textShadow: isGold ? "0 0 1.4vw #FFDD559A" : "0 0 1vw rgba(255,255,255,0.4)",
          }}
        >
          {title}
        </Typography>

        <Box sx={{

          fontSize: {
            xs: "3vw",   // mobile
            sm: "2.5vw",   // small tablets
            md: "1.8vw",   // laptops
            lg: "1.6vw",   // desktop
            xl: "1.4vw",   // large screens
          },


          fontWeight: '700'
        }}>
          <PricePulse label="BID" value={data.bid} dir={bidDir} />
          HIGH <span className="hl-value-high text-[#4aff95]">{data.high}</span>

        </Box>




        {/* Price Boxes */}
        <Box sx={{
          fontSize: {
            xs: "3vw",   // mobile
            sm: "2.5vw",   // small tablets
            md: "1.8vw",   // laptops
            lg: "1.6vw",   // desktop
            xl: "1.4vw",   // large screens
          },
          fontWeight: '700'
        }}>
          <PricePulse label="ASK" value={data.ask} dir={askDir} />
          LOW <span className="hl-value-low text-[#ff4a86]">{data.low}</span>

        </Box>


      </Box >
    );
  };

  return (
    <Box sx={{ p: "1.5vw 1vw", fontFamily: '"Orbitron", "Segoe UI", sans-serif' }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1vw", mx: "auto" }}>
        <MetalPanel
          data={goldData}
          bidDir={goldBidDir}
          askDir={goldAskDir}
          theme="gold"
        />

        <MetalPanel
          data={silverData}
          bidDir={silverBidDir}
          askDir={silverAskDir}
          theme="silver"
        />
        <MetalPanel
          data={platinumData}
          bidDir={platinumBidDir}
          askDir={platinumAskDir}
          theme="platinum"
        />
      </Box>


    </Box>
  );
};

export default SpotRate;