import React, { useState } from 'react'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { TextInput, Button } from 'react95';






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
            <TextInput label="Comments" multiline rows={4} placeholder='Add a new comment' variant="flat" value={comment} onChange={(e) => setComment(e.target.value)} style={{paddingBottom: '10px', fontFamily: 'ms_sans_serif'}}/>
            <Button type='submit'  style={{margin: '10px 0'}}>Submit</Button>
            {error && <div style={{color: 'red'}}>{error}</div>}
            {!error && <Box sx={{color: 'green'}}>{success}</Box>}
        </Box>
       
  
  )
}
