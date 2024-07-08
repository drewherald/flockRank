import React, { useEffect, useState } from 'react'
import SongCard from '../components/SongCard'
import { useParams } from 'react-router-dom'
import FormPopup from '../components/FormPopup'
import { Typography } from '@mui/material'
import '../assets/styles/pages/songPage.css'


export default function SongPage() {

    const [songs, setSongs] = useState(null)
    const [loading, setLoading] = useState(true)
    let {id} = useParams()
    
    
    useEffect(() => {
        const fetchSongs = async () => {
            const response = await fetch('https://flockrank.onrender.com/api/songs')
            const json = await response.json()
            console.log(json)

            if(response.ok){
                let songFilter = []
                for(let i = 0; i < json.length; i++) {
                    if(json[i].title === id){
                        songFilter.push(json[i])
                    }
                }
            if(songFilter.length>0){
                songFilter.sort((a,b) => a.upvotes - b.upvotes)
                songFilter.reverse()
                setSongs(songFilter)
            }
                
            }
            setLoading(false)
        }

        fetchSongs()
    }, [id])

  return (
    <>

        <div className='songs'>
            {(songs && !loading) && 
            <Typography variant='h4' sx={{padding: '10px 0 20px 0'}} className='songPageText'>{id} Best Versions </Typography> }
             {(songs && !loading) && songs.map((song) => (
                <SongCard key={song._id} title={song.title} date={song.date} venue={song.venue} city={song.city} state={song.state} comment={song.comment} upvotes={song.upvotes} id={song._id} externalComments={song.externalComments} userName = {song.userName}/>
            ))}
            {(!songs && !loading) &&
            <React.Fragment>
                <Typography variant='h5' sx={{padding: '10px 0 20px 0'}} className='songPageText'>Oh no! No versions of {id} have been submitted. </Typography>
                <FormPopup flavorText={'Start the conversation'} />
            </React.Fragment>
            
            }</div>
        
        
    </>
    
  )
}
