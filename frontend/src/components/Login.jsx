import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { TextInput, Button } from 'react95'

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
        <TextInput  label="E-Mail" type='email'  variant="flat" placeholder='E-Mail' value={email} onChange={(e) => setEmail(e.target.value)} style={{margin: '5px 0'}}/>
        <TextInput  label="Password" type={pVisible ? 'text' : 'password'} placeholder='Password' variant="flat" value={password} onChange={(e) => setPassword(e.target.value)}style={{margin: '5px 0'}} />
           
        <Button onClick={handleClickShowPassword} style={{margin: '20px 0 0 0'}}>{pVisible ? 'Hide Password' : 'Show Password'}</Button>
        <Button type='submit' disabled={isLoading} style={{margin: '10px 0 10px 0'}}>Log In</Button>
        {error && <Typography sx={{color: '#EE4B2B'}}>{error}</Typography>}
    </Box>
  )
}
