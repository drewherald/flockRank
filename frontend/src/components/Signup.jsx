import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

export default function Signup() {

    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, userName, password)
        
    }

  return (
    <Box component='form' className='signup' onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', width: '40dvw'}}>
        <h3>Sign up</h3>
        <TextField  label="E-Mail" type='email'  variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={{paddingBottom: '10px'}}/>
        <TextField  label="Screen Name"  variant="outlined" value={userName} onChange={(e) => setUserName(e.target.value)} sx={{paddingBottom: '10px'}}/>
        <TextField  label="Password" type='password' variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={{paddingBottom: '10px'}}/>
        <Button type='submit' variant='contained' disabled={isLoading} sx={{margin: '10px 0 30px 0'}}>Sign Up</Button>
        {error && <Box>{error}</Box>}
    </Box>
  )
}
