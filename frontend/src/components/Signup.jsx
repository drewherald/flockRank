import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import hide from '../assets/images/hide.png'
import view from '../assets/images/view.png'

export default function Signup() {

    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [pVisible, setpVisible] = useState(false)
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, userName, password)
    }

    const handleClickShowPassword = () => {
        if(pVisible){
          setpVisible(false)
        }else{
          setpVisible(true)
        }
    } 

  return (
    <Box component='form' className='signup' onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', width: '40dvw'}}>
        <h3>Sign up</h3>
        <TextField  label="E-Mail" type='email'  variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={{paddingBottom: '10px'}}/>
        <TextField  label="Screen Name"  variant="outlined" value={userName} onChange={(e) => setUserName(e.target.value)} sx={{paddingBottom: '10px'}}/>
        <TextField  label="Password" type={pVisible ? 'text' : 'password'} variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={{paddingBottom: '10px'}}
        InputProps={{endAdornment:(
          <InputAdornment position='end'>
            <IconButton  aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          >
          {pVisible ?  <img src={view} alt="" style={{height: '20px'}}/> : <img src={hide} alt="" style={{height: '20px'}}/> }
          

            </IconButton>
          </InputAdornment>
        )}}
        />
        <Button type='submit' variant='contained' disabled={isLoading} sx={{margin: '10px 0 30px 0'}}>Sign Up</Button>
        {error && <Box>{error}</Box>}
    </Box>
  )
}
