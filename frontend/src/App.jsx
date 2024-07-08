import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import React, { useState, createContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Box, Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SongPage from "./pages/SongPage";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";
import UserPage from "./pages/UserPage";

export const SongContext = createContext({
  songList: [],
  toggleColorMode: true,
  setColorMode: () => {},
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography:{
    fontFamily: ' Helvetica, sans-serif'
  }
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [songList, setSongList] = useState([]);
  const [toggleColorMode, setToggleColorMode] = useState([]);

  const setColorMode = () => {
    setToggleColorMode(!toggleColorMode);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch(
        "https://elgoose.net/api/v2/songs?order_by=name"
      );
      const json = await response.json();
      const length = await Object.keys(json.data).length;
      let placeHolder = [];

      if (response.ok) {
        for (let i = 0; i < length; i++) {
          if (!placeHolder.includes(json.data[i].name)) {
            placeHolder.push(json.data[i].name);
          }
        }
        setSongList(placeHolder);
      } else {
      }
    };

    fetchSongs();
  }, []);

  return (
    <AuthContextProvider>
      <SongContext.Provider value={{ songList, setColorMode }}>
        <ThemeProvider theme={toggleColorMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <Navbar />
            <Box className="pages" sx={{minHeight: '80svh'}}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/songs/:id" element={<SongPage />} />
                <Route path="/user/:id" element={<UserPage />} />
              </Routes>
            </Box>
            <Footer />
          </Container>
        </ThemeProvider>
      </SongContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
