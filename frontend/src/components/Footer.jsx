import React, {useContext} from 'react'
import { SongContext } from '../App';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Link } from 'react-router-dom';

export default function Footer() {

  const globalSongs = useContext(SongContext)
  const theme = useTheme();


  return (
    <Box sx={{padding: '50px 0 25px 0', position: 'relative', bottom: '0',  backgroundColor: '#008080', display: 'grid', gridTemplateColumns: '3fr 1fr', width: '100dvw'}}>
      <Box sx={{display: 'flex', paddingLeft: '40px'}}>
        <a href={'/about'} style={{textDecoration: 'none', color: '#dfe300'}}>About</a>
        <Typography sx={{padding: '0 5px', color: '#dfe300'}}>|</Typography>
        <a href={'/photos'} style={{textDecoration: 'none', color: '#dfe300'}}>Photo Gallery</a>
        <Typography sx={{padding: '0 5px', color: '#dfe300'}}>|</Typography>
        <a href={'https://www.paypal.com/donate/?business=LSCASE2RFA7YU&no_recurring=0&item_name=Thanks+for+donating+to+flockrank.net%21+Server+costs+are+not+cheap+%3A%29&currency_code=USD'} style={{textDecoration: 'none', color: '#dfe300'}}>Donate</a>
      </Box>
      <a href={'https://www.aliasmediadesign.com'} style={{textAlign: 'right', paddingRight: '40px', backgroundColor: '#008080', color: '#dfe300', textDecoration: 'none'}}>2024 Alias Media & Design LLC</a>
    </Box>

  )
}
