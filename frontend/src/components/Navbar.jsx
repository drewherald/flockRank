import React, {useContext} from 'react'
import FormPopup from './FormPopup'
import { Autocomplete, Box, Paper, Typography } from '@mui/material'
import { SongContext } from '../App';
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link';
import AuthPopup from './AuthPopup'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Button } from 'react95'
import frBlue from '../assets/images/FlockrankBLUE.png'

import '../assets/styles/components/navbar.css'



export default function Navbar() {

  const globalSongs = useContext(SongContext)
  const {logout} = useLogout()
  const {user} = useAuthContext()



  const handleLogout = () => {
    logout()
  }


  return (
    <header style={{backgroundColor: '#c6c6c6'}}>
      <Box className='headerContainer' sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
      <Box className='navContainer' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 0 10px 0', width: '86dvw'}}>
            <Link href={'/'} underline='none'  style={{ textDecoration: 'none' , paddingTop: '10px'}}>
                <img src={frBlue} style={{maxHeight: '10svh'}} alt='flockrank logo' ></img>
            </Link>
            <Box className='navInner' sx={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
              <Autocomplete
              options={globalSongs.songList}
              freeSolo
              sx={{ width: 300, padding: '0px' }}
              onChange={(e, newValue) =>  window.location.href = `/songs/${newValue}`}
              renderInput={(params) => <TextField {...params} label="Find a song" 
              className='songLookup'
              size='small'
             
              />}
              PaperComponent={({ children }) => (
                <Paper style={{ background: "#c6c6c6" }}>{children}</Paper>
              )}
              />
             
            </Box>
            
        </Box>
        <Box className='navContainer' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 7dvw', margin: '10px 0 0 0', width: '100%', backgroundColor: 'black'}}>
        
        <Typography sx={{backgroundColor: 'black', color: '#dfe300'}}>The Best Place to Rank Goose Shows on the Web</Typography>

         <span>
        {user ?
              <React.Fragment>
                <span className='loggedIn' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
                  <Typography component={Link} href={`/user/${user.userName}`} sx={{padding: '0 30px 0 0', backgroundColor: 'black', color: '	#394dcd' }} style={{ textDecoration: 'none' }}>Welcome, {user.userName}!</Typography>
                  
                  <Box sx={{display: 'flex'}}>
                    <FormPopup flavorText={'Post a new song'} />
                    <Button className='formButton' onClick={handleLogout} style={{margin: '0 10px', backgroundColor: '#c6c6c6'}}> Log Out</Button>
                  </Box>

                </span>
                
              </React.Fragment>
             
              : <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <AuthPopup flavorText={'Sign Up'} signup={true}/> 
                <AuthPopup flavorText={'Log In'} signup={false}/>
                </span>}
        </span>
        
       
        </Box>
      
      </Box>
        
    </header>
  )
}