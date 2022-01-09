import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar, Card, CardActions, CardContent, CardMedia, Container, Grid, Grow, IconButton, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBlog } from '../Redux/actions/blogActions';

const Details = () => {
  const [card, setCard] = useState();
  const { id } = useParams();
  // console.log(id);

  const cards = useSelector(state => state.blogReducer.blogData);
  const user = useSelector(state => state.userReducer.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(cards);

  useEffect(() => {
    setCard(cards.find(c => c.id == id));
  }, [card]);

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

  return !card ? (
    <LinearProgress />
  ) : (
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
                <CardMedia component='img' image={card.imageURL} title={card.title} />
                <CardContent style={{ backgroundColor: '#e7e6f5' }}>
                  <Typography variant='h4' mb={2} mt={2} align='center' style={{ color: '#046582' }}>
                    {card.title.toUpperCase()}
                  </Typography>
                  <Typography variant='h6' color='text.secondary' align='center'>
                    {card.date.toDate().toLocaleDateString()}
                  </Typography>
                  <Typography variant='body1' color='text.primary'>
                    {card.content}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography variant='h5' gutterBottom>
                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt={card.email.toUpperCase()} src='/static/images/avatar/2.jpg' />
                    </IconButton>
                    &nbsp; {card.email} &nbsp;
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton style={{ fontSize: '0.8em' }} size='small' color='error' disabled={!user} onClick={() => {}} aria-label='add to favorites'>
                    <Likes />
                  </IconButton>
                  {user?.uid === card?.uid && (
                    <div style={{ position: 'absolute', right: '15%' }}>
                      <IconButton style={{ fontSize: '0.8em' }} size='large' color='info' onClick={() => navigate(`/update-blog/${card.id}`)} aria-label='share'>
                        <EditIcon fontSize='large' />
                        &nbsp; EDIT &nbsp;
                      </IconButton>
                      <IconButton style={{ fontSize: '0.8em' }} size='large' color='error' onClick={() => dispatch(deleteBlog(card.id, navigate))} aria-label='share'>
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
