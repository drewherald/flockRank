import React, {useContext} from 'react'
import { SongContext } from '../App';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Footer() {

  const globalSongs = useContext(SongContext)
  const theme = useTheme();


  return (
    <Box sx={{padding: '50px 0 25px 0', position: 'relative', bottom: '0',  backgroundColor: '#008080'}}>
      <Typography sx={{textAlign: 'right', paddingRight: '40px', backgroundColor: '#008080'}}>2024 Alias Media & Design LLC</Typography>
    </Box>

  )
}
