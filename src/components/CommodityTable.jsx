import React from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";


const OUNCE = 31.103;
const AED = 3.674;

const UNIT_MULTIPLIER = {
  GM: 1,
  KG: 1000,
  TTB: 116.64,
  TOLA: 11.664,
  OZ: 31.103,
};

const CommodityTable = ({ commodities }) => {
  const { goldData, silverData } = useSpotRate();

  const getSpot = (metal) => {
    const lower = metal.toLowerCase();
    if (lower.includes("gold")) return goldData;
    if (lower.includes("silver")) return silverData;
    return null;
  };

  const purityFactor = (purity) =>
    purity ? purity / 10 ** String(purity).length : 1;

  const formatPrice = (value) => {
    if (value == null || isNaN(value)) return "—";
    const intLen = Math.floor(Math.abs(value)).toString().length;
    let decimals = 3;
    if (intLen >= 4) decimals = 0;
    else if (intLen === 3) decimals = 2;
    return value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const rows = commodities
    ?.map((item) => {
      const spot = getSpot(item.metal);
      if (!spot) return null;

      const mult = UNIT_MULTIPLIER[item.weight] || 1;
      const pur = purityFactor(item.purity);

      const baseBid = (spot.bid / OUNCE) * AED * mult * item.unit * pur;
      const baseAsk = (spot.ask / OUNCE) * AED * mult * item.unit * pur;

      const bid = baseBid + (Number(item.buyCharge) || 0) + (Number(item.buyPremium) || 0);
      const ask = baseAsk + (Number(item.sellCharge) || 0) + (Number(item.sellPremium) || 0);

      return {
        display: item.purity
          ? `${item.purity} ${item.metal === "Gold Ten TOLA" ? "Gold" : item.metal}`
          : item.metal,
        unit: `${item.unit} ${item.weight}`,
        bid,
        ask,
      };
    })
    .filter(Boolean) ?? [];

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          padding: "0.85vw",
          mb: "0.5vw",

          borderRadius: "0.55vw",
          alignItems: "center",
          background:
            "linear-gradient(90deg, rgba(201,162,63,1) 0%, rgba(244,226,138,1) 56%, rgba(223,194,101,1) 100%)",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.2vw",
            fontWeight: 700,
            color: "#000",
            textTransform: "uppercase",
            letterSpacing: "0.04vw",
          }}
        >
          Commodity
        </Typography>

        <Typography
          sx={{
            fontSize: "1.15vw",
            fontWeight: 700,
            color: "#000",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Unit
        </Typography>

        <Typography
          sx={{
            fontSize: "1.15vw",
            fontWeight: 700,
            color: "#000",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          BID (AED)
        </Typography>

        <Typography
          sx={{
            fontSize: "1.15vw",
            fontWeight: 700,
            color: "#000",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          ASK (AED)
        </Typography>
      </Box>

      {/* Rows */}
      {rows.length === 0 ? (
        <Typography
          sx={{
            py: "3.5vw",
            textAlign: "center",
            color: "rgba(255,215,0,0.4)",
            fontSize: "1.3vw",
          }}
        >
          No rates available
        </Typography>
      ) : (
        rows.map((row, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              padding: "0.85vw",
              borderRadius: "0.55vw",
              boxShadow: "0 0.35vw 1.4vw rgba(136 255 235 / 0.07)",

              mb: "0.5vw",
              alignItems: "center",
              bgcolor: "rgba(13, 22, 32, 0.6)",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.25vw",
                fontWeight: 700,
              }}
            >
              {row.display}
            </Typography>

            <Typography
              sx={{
                fontSize: "1.35vw",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {row.unit}
            </Typography>

            <Typography
              sx={{
                fontSize: "1.35vw",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {formatPrice(row.bid)}
            </Typography>

            <Typography
              sx={{
                fontSize: "1.35vw",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {formatPrice(row.ask)}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default CommodityTable;