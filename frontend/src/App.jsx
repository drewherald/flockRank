import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import React, { useState, createContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Box, Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import SongPage from "./pages/SongPage";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";
import UserPage from "./pages/UserPage";
import { styleReset } from 'react95';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider, createTheme } from "@mui/material/styles";






/* Pick a theme of your choice */
import original from 'react95/dist/themes/original';

/* Original Windows95 font (optional) */
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }

  *{
    background-color: #008080;
    color: black;
  }
`;



const theme = createTheme({
  typography:{
    fontFamily: 'ms_sans_serif'
  }
});


export const SongContext = createContext({
  songList: [],
  toggleColorMode: true,
  setColorMode: () => {},
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
      <GlobalStyles />
      <ThemeProvider theme={theme}>
      <SongContext.Provider value={{ songList, setColorMode }}>
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
      </SongContext.Provider>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
