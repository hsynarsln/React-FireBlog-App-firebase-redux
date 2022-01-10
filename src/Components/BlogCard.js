import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { infoNote } from '../Helpers/toastNotify';
import { likeBlog } from '../Redux/actions/blogActions';

const BlogCard = ({ card }) => {
  // console.log(card.id);
  const user = useSelector(state => state.userReducer.user);
  // console.log(user);
  const dispatch = useDispatch();
  // console.log(card);
  const navigate = useNavigate();

  const showDetail = () => {
    if (user) {
      navigate(`/detail/${card.id}`);
    } else {
      navigate('login');
      infoNote('Please Login for blog details!!');
    }
  };

  const Likes = () => {
    if (card.likes.length > 0) {
      return card.likes.find(like => like === user?.uid) ? (
        <>
          <FavoriteIcon fontSize='small' />
          &nbsp;{card.likes.length}
        </>
      ) : (
        <>
          <FavoriteBorderIcon fontSize='small' />
          &nbsp;{card.likes.length}
        </>
      );
    }

    return (
      <>
        <FavoriteBorderIcon fontSize='small' />
      </>
    );
  };

  return (
    <>
      <Card sx={{ maxWidth: 425 }}>
        <div className='transform'>
          <CardMedia
            style={{ cursor: 'pointer' }}
            height='194'
            component='img'
            image={card.imageURL}
            title={card.title}
            onClick={() => {
              // user ? navigate(`/detail/${card.id}`) : navigate('login');
              showDetail();
            }}
          />
          <CardContent style={{ backgroundColor: '#e7e6f5', cursor: 'pointer', height: '6rem' }} onClick={() => navigate(`/detail/${card.id}`)}>
            <Typography variant='h5' color='text.primary' mb={2} style={{ color: '#046582' }}>
              {card.title.toUpperCase()}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              {card.date.toDate().toLocaleDateString()}
            </Typography>
            <Typography variant='body2' color='text.primary' className='line-clamp'>
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
            <Likes />
          </IconButton>
          {/* {(user?.result?.googleId === card?.creator || user?.result?._id === card?.creator) && (
            <IconButton style={{ fontSize: '0.8em' }} size='small' color='info' onClick={() => {}} aria-label='share'>
              <DeleteIcon fontSize='small' />
              &nbsp; DELETE &nbsp;
            </IconButton>
          )} */}
        </CardActions>
      </Card>
    </>
  );
};

export default BlogCard;
