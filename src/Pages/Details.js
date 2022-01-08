import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar, Card, CardActions, CardContent, CardMedia, Container, Grid, Grow, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cards } from '../Helpers/data';

const Details = () => {
  const { id } = useParams();
  const [user, setUser] = useState(true);
  // console.log(cards);
  let card = cards.find(c => c.id == id);
  // console.log(card);
  const navigate = useNavigate();

  const Likes = () => {
    if (card.likes.length > 0) {
      return card.likes.find(like => like === (user?.result?.googleId || user?.result?._id)) ? (
        <>
          <FavoriteIcon fontSize='large' />
          &nbsp;{card.likes.length > 2 ? `You and ${card.likes.length - 1} others` : `${card.likes.length} like${card.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <FavoriteBorderIcon fontSize='large' />
          &nbsp;{card.likes.length} {card.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <FavoriteBorderIcon fontSize='large' />
        &nbsp;Like
      </>
    );
  };

  return (
    <>
      <Typography variant='h4' align='center' sx={{ my: 2, color: '#046582' }}>
        <span>--------- </span>
        <span style={{ fontSize: '3rem' }}>D</span>
        ETAILS
        <span> ---------</span>
      </Typography>
      <Grow in>
        <Container>
          <Grid container justify='center' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <Card sx={{ maxWidth: 1200 }}>
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
                <CardMedia component='img' image={card.imageURL} title={card.title} />
                <CardContent style={{ backgroundColor: '#e7e6f5' }}>
                  <Typography variant='h4' mb={2} mt={2} align='center' style={{ color: '#046582' }}>
                    {card.title.toUpperCase()}
                  </Typography>
                  <Typography variant='h6' color='text.secondary' align='center'>
                    {card.date}
                  </Typography>
                  <Typography variant='body1' color='text.primary'>
                    {card.content}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography variant='h5' gutterBottom>
                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                    </IconButton>
                    &nbsp; {card.email} &nbsp;
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton style={{ fontSize: '0.8em' }} size='small' color='error' disabled={user} onClick={() => {}} aria-label='add to favorites'>
                    <Likes />
                  </IconButton>
                  {(user?.result?.googleId === card?.creator || user?.result?._id === card?.creator) && (
                    <div style={{ position: 'absolute', right: '15%' }}>
                      <IconButton style={{ fontSize: '0.8em' }} size='large' color='info' onClick={() => navigate(`/update-blog/${card.id}`)} aria-label='share'>
                        <EditIcon fontSize='large' />
                        &nbsp; EDIT &nbsp;
                      </IconButton>
                      <IconButton style={{ fontSize: '0.8em' }} size='large' color='error' onClick={() => {}} aria-label='share'>
                        <DeleteIcon fontSize='large' />
                        &nbsp; DELETE &nbsp;
                      </IconButton>
                    </div>
                  )}
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Details;
