import React from "react";
import { Box, Typography } from "@mui/material";
import "../assets/styles/pages/home.css";

export default function Photos() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gap: "10px",
        backgroundColor: "#008080",
        padding: "10px 0",
        minHeight: "80svh",
      }}
    >
      <Box sx={{ backgroundColor: "#008080" }}></Box>
      <Box>
        <Typography
          variant="h4"
          className="welcomeToFR"
          sx={{
            padding: "10px 0 20px 0",
            backgroundColor: "#008080",
            fontFamily: `'Tahoma', 'ms_sans_serif'`,
          }}
        >
          {" "}
          Photo Gallery{" "}
        </Typography>
      </Box>
    </Box>
  );
}
