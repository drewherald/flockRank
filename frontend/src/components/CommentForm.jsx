import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';






export default function Songform({songId, externalComments, triggerOpen}) {

    const [comment, setComment] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState('')




    const handleSubmit = async (e) => {
        e.preventDefault()
        let newComments = externalComments
        const user = JSON.parse(localStorage.getItem('user'))
        newComments.push([comment, user.userName])
        const commentUpdate = {id: songId, externalComments: newComments}
        const token = user.token
        const response = await fetch(`https://flockrank.onrender.com/api/songs/${songId}`, {
            method: 'PATCH',
            body: JSON.stringify(commentUpdate),
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`     
            }
        })

        const commentJson = await response.json()

        if(!response.ok){
            console.log(commentJson)
            setError(commentJson.error)
        }
        if(response.ok){
          
            setComment('')
            setError(null)
            setSuccess('Your comment has been posted!')
            console.log('new comment added', commentJson)
            triggerOpen()
        }
    }

 
  return (
    
        <Box component='form' className='create' onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', width: '40dvw'}}>
            <h3>Add a new comment</h3>
        
            <TextField id="outlined-basic" label="Comments" multiline rows={3} variant="outlined" value={comment} onChange={(e) => setComment(e.target.value)} sx={{paddingBottom: '10px'}}/>
            <Button type='submit' variant='contained' sx={{margin: '10px 0 30px 0'}}>submit</Button>
            {error && <div>{error}</div>}
            {!error && <Box sx={{color: 'green'}}>{success}</Box>}
        </Box>
       
  
  )
}
