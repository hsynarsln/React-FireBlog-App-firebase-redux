import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import usersvg from '../Assets/user.svg';

const BlogCard = ({ card, setCurrentId }) => {
  // console.log(card.id);
  const user = useSelector(state => state.userReducer.user);
  // console.log(card);
  const navigate = useNavigate();

  const Likes = () => {
    if (card.likes.length > 0) {
      return card.likes.find(like => like === (user?.result?.googleId || user?.result?._id)) ? (
        <>
          <FavoriteIcon fontSize='small' />
          &nbsp;{card.likes.length > 2 ? `You and ${card.likes.length - 1} others` : `${card.likes.length} like${card.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <FavoriteBorderIcon fontSize='small' />
          &nbsp;{card.likes.length} {card.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <FavoriteBorderIcon fontSize='small' />
        &nbsp;Like
      </>
    );
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        {/* <CardHeader
          action={
            (user?.result?.googleId === card?.creator || user?.result?._id === card?.creator) && (
              <IconButton aria-label='settings' onClick={() => setCurrentId(card.id)}>
                <MoreHorizIcon />
              </IconButton>
            )
          }
          title={card.email}
          subheader={card.date}
        /> */}
        <div className='transform'>
          <CardMedia
            style={{ cursor: 'pointer' }}
            height='194'
            component='img'
            image={card.imageURL}
            title={card.title}
            onClick={() => {
              user ? navigate(`/detail/${card.id}`) : navigate('login');
            }}
          />
          <CardContent style={{ backgroundColor: '#e7e6f5', cursor: 'pointer' }} onClick={() => navigate(`/detail/${card.id}`)}>
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
          <Typography variant='h6' gutterBottom>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt='Remy Sharp' src={usersvg} />
            </IconButton>
            &nbsp; {card.email} &nbsp;
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton style={{ fontSize: '0.8em' }} size='small' color='error' disabled={user} onClick={() => {}} aria-label='add to favorites'>
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
