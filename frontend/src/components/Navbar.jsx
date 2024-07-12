import React, {useContext} from 'react'
import FormPopup from './FormPopup'
import { Autocomplete, Box, Button, Typography } from '@mui/material'
import { SongContext } from '../App';
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link';
import AuthPopup from './AuthPopup'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import '../assets/styles/components/navbar.css'



export default function Navbar() {

  const globalSongs = useContext(SongContext)
  const {logout} = useLogout()
  const {user} = useAuthContext()


  const handleLogout = () => {
    logout()
  }

  const buttonStyle = {
    fontWeight: '600',
    fontSize: '0.875rem',
    lineHeight: 1.5,
    backgroundColor: '#007FFF',
    padding: '8px 16px',
    borderRadius: '8px',
    boxShadow: '0 2px 1px rgba(0, 0, 0, 0.5), inset 0 1.5px 1px #3399FF, inset 0 -2px 1px #0072E5',
    margin:' 20px 10px',
    cursor: 'pointer'
  }
  
  return (
    <header>
        <Box className='navContainer' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 0'}}>
            <Link href={'/'} underline='none'  style={{ textDecoration: 'none' }}>
                <Typography className='flockranknet' variant='h4' sx={{fontFamily: 'Elianto, Helvetica, sans-serif'}}>FLOCKRANK.NET</Typography>
            </Link>
            <Box className='navInner' sx={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
              <Autocomplete
              options={globalSongs.songList}
              freeSolo
              sx={{ width: 300, paddingRight: '20px' }}
              onChange={(e, newValue) =>  window.location.href = `/songs/${newValue}`}
              renderInput={(params) => <TextField {...params} label="Find a song" 
              className='songLookup'
              />}
              
              />
              {user ?
              <React.Fragment>
                <FormPopup flavorText={'Post a new song'} />
                <Box onClick={handleLogout} type='Button' sx={buttonStyle}> Log Out</Box>
                <Typography component={Link} href={`/user/${user.userName}`} sx={{padding: '0 16px'}} style={{ textDecoration: 'none' }}>{user.userName}</Typography>

                
              </React.Fragment>
             
              : <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <AuthPopup flavorText={'Sign Up'} signup={true}/> 
                <AuthPopup flavorText={'Log In'} signup={false}/>
                </span>}
            </Box>
            
        </Box>
    </header>
  )
}
