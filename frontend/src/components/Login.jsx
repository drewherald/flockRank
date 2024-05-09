import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)

    }

  return (
    <Box component='form' className='login' onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', width: '40dvw'}}>
        <h3>Log In</h3>
        <TextField  label="E-Mail" type='email'  variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={{paddingBottom: '10px'}}/>
        <TextField  label="Password" type='password' variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={{paddingBottom: '10px'}}/>
        <Button type='submit' disabled={isLoading} variant='contained' sx={{margin: '10px 0 30px 0'}}>Log In</Button>
        {error && <Box>{error}</Box>}
    </Box>
  )
}
