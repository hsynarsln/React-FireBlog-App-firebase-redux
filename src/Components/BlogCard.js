import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ card, setCurrentId }) => {
  const user = null;
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
        {/* //! moment --> example; 5 seconds ago, 5 minutes ago gibi */}
        <CardMedia component='img' image={card.image} title={card.title} onClick={() => navigate(`/detail/${card.id}`)} />
        <CardContent style={{ backgroundColor: '#e7e6f5' }} onClick={() => navigate(`/detail/${card.id}`)}>
          <Typography variant='h5' color='text.secondary'>
            {card.title}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            {card.date}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {card.description}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            {card.email}
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
