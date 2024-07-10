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

  
  return (
    <header>
        <Box className='navContainer' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 0'}}>
            <Link href={'/'} underline='none'  style={{ textDecoration: 'none' }}>
                <Typography variant='h4' sx={{fontFamily: 'Elianto, Helvetica, sans-serif'}}>FLOCKRANK.NET</Typography>
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
                  <Typography component={Link} href={`/user/${user.userName}`} sx={{padding: '0 16px'}} style={{ textDecoration: 'none' }}>{user.userName}</Typography>
                  <Button onClick={handleLogout} type='Button'> Log Out</Button>
                
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
