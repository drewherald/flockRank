import React, {useContext} from 'react'
import { SongContext } from '../App';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Footer() {

  const globalSongs = useContext(SongContext)
  const theme = useTheme();


  return (
    <Box sx={{padding: '20px 0', position: 'relative', bottom: '0'}}>
        {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={globalSongs.setColorMode} color="inherit">
      {localStorage.getItem('colorMode') === true ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
    </Box>

  )
}
