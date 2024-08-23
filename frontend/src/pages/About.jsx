import React from "react";
import { Box, Typography } from "@mui/material";
import "../assets/styles/pages/home.css";
import "../assets/styles/pages/about.css";
import drew from '../assets/images/drewAbout.JPG'

export default function About() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr 1fr",
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
          About us{" "}
        </Typography>
        <Box className='aboutContent'>
          <Typography>
            Hi all! My name is Drew and I am a Goose fan/software developer. I started my journey with a pair of shows at Pullman 
            Yards in Atlanta '23 and have been hooked ever since! A few months later I began work on FlockRank.net, as I was keeping
            a running list of my favorite versions of Goose songs and wanted to share it with others in the community. As a self-taught 
            software developer who is early in my journey, it has taken lots of time and chipping away to finally finish building this 
            site, and as a true passion project I am excited you are here! I hope you are able to share your favorite versions of 
            Goose jams and find some new ones along the way. Additionally I am a film photographer who finds myself at many shows 
            with a camera, so check out the photo gallery if you are interested :) If you have photos of your own to share, please email them
            to photos@flockrank.net and I will add them to the site!!!
          </Typography>
          <Box sx={{display: 'flex', alignItems:'center'}}>
            <div>
            <img src={drew} style={{maxHeight: '30svh'}} alt="drew" />
            <Typography sx={{paddingTop: '5px', fontSize: '12px', textAlign:'center'}}>NYE '22 in Cincy</Typography>

            </div>
          </Box>
          
        </Box>
        
      </Box>
    </Box>
  );
}
