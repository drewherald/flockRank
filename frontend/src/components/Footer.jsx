import React from "react";
import { Box, Typography } from "@mui/material";
import "../assets/styles/components/footer.css";


export default function Footer() {
  return (
    <Box
      className='footerBox'
      sx={{
        padding: "50px 0 25px 0",
        position: "relative",
        bottom: "0",
        backgroundColor: "#008080",
        display: "grid",
        width: "100dvw",
      }}
    >
      <Box className='quickLinks' sx={{ display: "flex" }}>
      <a href={"/"} style={{ textDecoration: "none", color: "#dfe300" }}>
          Home
        </a>
        <Typography className="linkLine" sx={{ padding: "0 5px", color: "#dfe300" }}>|</Typography>
        <a href={"/about"} style={{ textDecoration: "none", color: "#dfe300" }}>
          About
        </a>
        <Typography className="linkLine" sx={{ padding: "0 5px", color: "#dfe300" }}>|</Typography>
        <a
          href={"/photos"}
          style={{ textDecoration: "none", color: "#dfe300" }}
        >
          Photo Gallery
        </a>
        <Typography sx={{ padding: "0 5px", color: "#dfe300" }}>|</Typography>
        <a
          href={
            "https://www.paypal.com/donate/?business=LSCASE2RFA7YU&no_recurring=0&item_name=Thanks+for+donating+to+flockrank.net%21+Server+costs+are+not+cheap+%3A%29&currency_code=USD"
          }
          style={{ textDecoration: "none", color: "#dfe300" }}
        >
          Donate
        </a>
      </Box>
      <a
        href={"https://www.aliasmediadesign.com"}
        className="alias"
        style={{
          backgroundColor: "#008080",
          color: "#dfe300",
          textDecoration: "none",
        }}
      >
        2024 Alias Media & Design
      </a>
    </Box>
  );
}
