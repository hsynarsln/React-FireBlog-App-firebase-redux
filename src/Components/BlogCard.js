import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Avatar, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { infoNote } from '../Helpers/toastNotify';
import { getBlogWithId, likeBlog } from '../Redux/actions/blogActions';
import CommentModal from './CommentModal';
import Likes from './Likes';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#f5f5f5',
  border: '2px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  fontFamily: 'Permanent Marker',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

const BlogCard = ({ card }) => {
  // console.log(card.id);
  const user = useSelector(state => state.userReducer.user);
  // console.log(user);
  const dispatch = useDispatch();
  // console.log(card);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [input, setInput] = useState('');

  const showDetail = () => {
    if (user) {
      dispatch(getBlogWithId(card.id));
      navigate(`/detail/${card.id}`);
    } else {
      navigate('login');
      infoNote('Please Login for blog details!!');
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 425 }}>
        <div className='transform'>
          <CardMedia style={{ cursor: 'pointer' }} height='175' component='img' image={card.imageURL} title={card.title} onClick={showDetail} />
          <CardContent style={{ backgroundColor: '#e7e6f5', cursor: 'pointer', height: '6rem' }} onClick={showDetail}>
            <Typography variant='h5' color='text.primary' mb={2} style={{ color: '#046582', fontFamily: 'Permanent Marker' }}>
              {card.title.toUpperCase()}
            </Typography>
            <Typography variant='body1' color='text.secondary' style={{ fontFamily: 'Architects Daughter', fontWeight: '900' }}>
              {card.date.toDate().toString().slice(4, 15)}
            </Typography>
            <Typography variant='body2' color='text.primary' className='line-clamp' style={{ fontFamily: 'Architects Daughter' }}>
              {card.content}
            </Typography>
          </CardContent>
        </div>
        <CardContent>
          <Typography variant='body1' gutterBottom>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt={card.email.toUpperCase()} src='/static/images/avatar/2.jpg' />
            </IconButton>
            &nbsp; {card.email} &nbsp;
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton style={{ fontSize: '0.8em', cursor: 'pointer' }} size='small' color='error' disabled={!user} onClick={() => dispatch(likeBlog(card.id, user.uid))} aria-label='add to favorites'>
            <Likes card={card} user={user} />
          </IconButton>
          <IconButton style={{ fontSize: '0.8em', cursor: 'pointer' }} size='small' disabled={!user} onClick={e => setOpen(true)} aria-label='comment'>
            <ChatBubbleOutlineIcon />
            &nbsp; {card.comments?.length || 0}
          </IconButton>
        </CardActions>
      </Card>
      <CommentModal input={input} setInput={setInput} open={open} setOpen={setOpen} user={user} card={card} />
    </>
  );
};

export default BlogCard;
