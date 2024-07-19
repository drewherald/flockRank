import React, { useState, useContext } from 'react'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SongContext } from '../App';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Paper, Typography } from '@mui/material';
import { Button } from 'react95'





export default function Songform() {

    const [title, setTitle] = useState('')
    const [rerenderAutocomplete, setRerenderAutocomplete] = useState('')
    const [rerenderDate, setRerenderDate] = useState('')
    const [date, setDate] = useState('')
    const [venue, setVenue] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [comment, setComment] = useState('')
    const [error, setError] = useState(null)

    const globalSongs = useContext(SongContext)

    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const upvotes = 0
        const user = JSON.parse(localStorage.getItem('user'))
        const token = user.token
        const song = {title, date, venue, city, state, comment, upvotes, userName: user.userName}
        const response = await fetch('https://flockrank.onrender.com/api/songs', {
            method: 'POST',
            body: JSON.stringify(song),
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`     
            }
        })

        const songJson = await response.json()

        if(!response.ok){
            console.log(songJson)
            setError(songJson.error)
        }
        if(response.ok){
            setRerenderAutocomplete(`Congrats! Your listing for ${title} has been posted`)
            setRerenderDate('')
            setTitle('')
            setDate('')
            setVenue('')
            setCity('')
            setState('')
            setComment('')
            setError(null)
            
            console.log('new song added', songJson)
        }
    }

 
  return (
    
        <Box component='form' className='create' onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', width: '40dvw'}}>
        <Typography sx={{fontSize: '24px', textAlign: 'center', paddingBottom: '20px'}} >Add a New Version</Typography>
        <Autocomplete
            freeSolo
            key={rerenderAutocomplete}
            options={globalSongs.songList}
            sx={{paddingBottom: '10px'}}
            onChange={(e, newValue) => setTitle(newValue)}
            renderInput={(params) => <TextField {...params} label="Song" />}
            PaperComponent={({ children }) => (
                <Paper style={{ background: "#c6c6c6" }}>{children}</Paper>
              )}
            />
        
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                label='Show Date'
                sx={{paddingBottom: '10px'}}
                key={rerenderDate}
                renderInput={(params) => (
                    <TextField
                    sx={{ backgroundColor: '#c6c6c6' }}
                    fullWidth
                    {...params}
                    />
                )}
                onChange={(newValue) => setDate(newValue.$d.toLocaleDateString())}/>
               
                
           </LocalizationProvider>

            <TextField  label="Venue"  variant="outlined" value={venue} onChange={(e) => setVenue(e.target.value)} sx={{paddingBottom: '10px'}}/>
            <TextField  label="City"  variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} sx={{paddingBottom: '10px'}}/>
            <TextField  label="State (Postal Code ex: CO, blank if International)" variant="outlined" value={state} onChange={(e) => setState(e.target.value)} sx={{paddingBottom: '10px'}}/>
            <TextField id="outlined-basic" label="Comments" variant="outlined" value={comment} onChange={(e) => setComment(e.target.value)} sx={{paddingBottom: '10px'}}/>
            <Button className='formButton' type='submit'  style={{margin: '10px 0 10px 0', backgroundColor: '#c6c6c6'}}>Submit</Button>
            {error && <Typography sx={{color: 'red'}}>{error}</Typography>}
            {!error && <Box sx={{color: 'green'}}>{rerenderAutocomplete}</Box>}
        </Box>
       
  
  )
}
