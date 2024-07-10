import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box,  SvgIcon, Typography } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CommentPopup from './CommentPopup';
import ListItem from '@mui/material/ListItem';
import '../assets/styles/components/songCard.css'
import { useAuthContext } from '../hooks/useAuthContext';



export default function SongCard({title, date, venue, city, state, comment, upvotes, id, externalComments, userName}) {

  const [upvoteCount, setUpvoteCount] = useState(upvotes)
  const [upvoted, setUpvoted] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const {user} = useAuthContext()


  let cardStyle = {
    width: '50dvw',
    margin: "20px 0",
    backgroundColor: "#424242"
  }

  const handleClick = async() => {

    if(user){
      console.log('upvote')
      const update = upvotes + 1
      const song = { upvotes: update, id}
      const user = JSON.parse(localStorage.getItem('user'))
      const token = user.token
      const response = await fetch(`https://flockrank.onrender.com/api/songs/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(song),
          headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`     
 
          }
      })
      console.log(response)
      setUpvoteCount(upvoteCount + 1)
      setUpvoted(true)
    }
   
  }

  return (
    <>
    <Card variant="outlined" style={cardStyle} sx={{display: 'flex', alignItems: 'center'}} className='songCard'>
        <CardContent >
          <Box sx={{display: 'flex', alignItems: 'center', color: 'white'}}>
              <Box sx={{marginRight: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <SvgIcon onClick={upvoted ? null : handleClick} component={ArrowCircleUpIcon} sx={{cursor: 'pointer', ":hover": {color: 'blue'},  color: upvoted ? 'blue' : ''} }></SvgIcon>
                <Typography >{upvoteCount}</Typography>
              </Box>
              <Box>
              <Typography variant='h5'>{title} {date} {venue}</Typography>
              <Typography>{city} {state}</Typography>
              <Typography >{comment}</Typography>
              <div>
                <ul style={{display: 'flex', margin: '0', listStyle: 'none', padding: '16px 0 0 0', fontSize: '12px', alignItems: 'center'}} className='commentInterface'>
                    <li style={{":hover": {color: 'blue}'}, padding: '0', display: 'block', margin: '0'} } onClick={() => setShowComments(!showComments)}>{externalComments ? externalComments.length : 0} comments</li>
                    {user &&
                      <React.Fragment>
                        <li style={{padding:' 0 5px'}} className='desktop'> | </li>
                        <li><CommentPopup flavorText={'add a comment'} songId = {id} externalComments={externalComments}/></li>
                      </React.Fragment>
                      }
                    <li style={{padding:' 0 5px'}} className='desktop'> | </li>
                    <li>posted by: <Typography className='userLinkSC' onClick={() =>  window.location.href = `/user/${userName}`}  style={{ textDecoration: 'none', color: 'white', fontSize: '12px', display: 'inline', cursor: 'pointer'}}>{userName}</Typography> </li>
                </ul>
              </div>
              
                </Box>
          </Box>
              {(showComments && externalComments.length>0) && <div style={{padding: '20px 0 0 40px'}}>
                  {externalComments.map((comment) => <Typography sx={{paddingTop: '10px'}}>{comment[0]} <br/> <span style={{fontSize: '10px'}}>posted by: <Typography className='userLinkSC' onClick={() =>  window.location.href = `/user/${userName}`}  style={{ textDecoration: 'none', color: 'white', fontSize: '10px', display: 'inline', cursor: 'pointer'}}>{comment[1]}</Typography></span></Typography>)}
              </div>}

        </CardContent>
    </Card>
    </>
  )
}
