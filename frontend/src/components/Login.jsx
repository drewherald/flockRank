import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import hide from '../assets/images/hide.png'
import view from '../assets/images/view.png'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pVisible, setpVisible] = useState(false)
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)

    }

    const handleClickShowPassword = () => {
      if(pVisible){
        setpVisible(false)
      }else{
        setpVisible(true)
      }
  } 

  return (
    <Box component='form' className='login' onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', width: '40dvw'}}>
        <h3>Log In</h3>
        <TextField  label="E-Mail" type='email'  variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={{paddingBottom: '10px'}}/>
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
        />        <Button type='submit' disabled={isLoading} variant='contained' sx={{margin: '10px 0 30px 0'}}>Log In</Button>
        {error && <Box>{error}</Box>}
    </Box>
  )
}
