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
            padding: "20px 0 10px 0",
            backgroundColor: "#008080",
            fontFamily: `'Tahoma', 'ms_sans_serif'`,
          }}
        >
          About Us
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
            to flockrank@zohomail.com and I will add them to the site!!!
          </Typography>
          <Box className='drewPic' sx={{display: 'flex', alignItems:'center'}}>
            <div>
            <img src={drew} style={{maxHeight: '30svh'}} alt="drew" />
            <Typography sx={{paddingTop: '5px', fontSize: '12px', textAlign:'center'}}>NYE '22 in Cincy</Typography>

            </div>
          </Box>
          
        </Box>
        <Typography
          variant="h4"
          className="welcomeToFR"
          sx={{
            padding: "20px 0 10px 0",
            backgroundColor: "#008080",
            fontFamily: `'Tahoma', 'ms_sans_serif'`,
          }}
        >
          What is FlockRank?
        </Typography>
        <Box className='aboutContent'>
        <Typography>
            Half the fun about following a Jam Band is the debate that comes with different jams and deciding which ones you are going to 
            return to time and time again. FlockRank.net is a website designed to keep track of the best versions of each Goose song. 
            Using the search bar, you can look up any Goose song or cover in an instant to see what users think are the best versions,
            as well as join in on the conversation yourself. 
            Clicking 'Sign Up' on the top right corner will allow you to jump in and create an account to begin ranking and posting songs.
            Once logged in, the 'Post a New Song' button will allow you to create submissions of your own. Please accurately fill out 
            song title, show date, venue, city, and state. Additionally please add a comment describing why you enjoy that version 
            specifically. If that version has already been submitted, your comment will be added under the original post and your 
            comment will be added to the 'comments' section. Each version can have comments from other users who enjoy it as well and you
            can show your love for a specific version by clicking the upvote button on a song card. Additionally, click on a user's screen 
            name will allow you to see all of their submissions. <br /> <br />
            Now, it is up to you! This site needs a living, breathing community in order to be successful, so feel free to sign up and 
            share the songs you listen to most!
          </Typography>
          </Box>
        
      </Box>
    </Box>
  );
}
