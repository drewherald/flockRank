import React, { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import { Box, Typography } from "@mui/material";
import "../assets/styles/pages/home.css";

export default function Home() {
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("https://flockrank.onrender.com/api/songs");
      const json = await response.json();

      if (response.ok) {
        json.sort((a, b) => a.upvotes - b.upvotes);
        json.reverse();
        setSongs(json);
      }
    };

    fetchSongs();
  }, []);

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
          Welcome to FlockRank! A place to rank your favorite versions of Goose
          songs.{" "}
        </Typography>
        <div className="songs" style={{ backgroundColor: "#008080" }}>
          <Typography
            variant="h5"
            sx={{ padding: "10px 0 20px 0", backgroundColor: "#008080" }}
          >
            {" "}
            Top 5 Songs{" "}
          </Typography>
          {songs &&
            songs
              .slice(0, 5)
              .map((song) => (
                <SongCard
                  key={song._id}
                  title={song.title}
                  date={song.date}
                  venue={song.venue}
                  city={song.city}
                  state={song.state}
                  comment={song.comment}
                  upvotes={song.upvotes}
                  id={song._id}
                  externalComments={song.externalComments}
                  userName={song.userName}
                />
              ))}
        </div>
      </Box>
      <Box sx={{ backgroundColor: "#008080" }}></Box>
    </Box>
  );
}
