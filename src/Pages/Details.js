import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Container, Grid, Grow, IconButton, LinearProgress, List, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../Components/Comments';
import Likes from '../Components/Likes';
import { addCommentBlog, deleteBlog, getBlogWithId } from '../Redux/actions/blogActions';

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

const Details = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const card = useSelector(state => state.blogReducer.blog);
  // console.log(card);
  const user = useSelector(state => state.userReducer.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBlogWithId(id));
  }, [dispatch, input]);

  //! ADD COMMENT
  const addComment = async e => {
    e.preventDefault();

    await dispatch(addCommentBlog({ id: card.id, timestamp: Timestamp.now(), creator: user.email, text: input }));

    setInput('');
    setOpen(false);
  };

  return !card ? (
    <LinearProgress />
  ) : (
    <>
      <Typography className='background double' style={{ fontFamily: 'Qwitcher Grypen', marginTop: '5rem' }} variant='h3' align='center' sx={{ my: 2, color: '#046582' }}>
        <span className='span'>DETAILS</span>
      </Typography>
      <Grow in>
        <Container>
          <Grid container justify='center' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <Card sx={{ maxWidth: 1200 }}>
                <CardMedia component='img' height='600' image={card.imageURL} title={card.title} />
                <CardContent style={{ backgroundColor: '#e7e6f5' }}>
                  <Typography variant='h4' color='text.primary' mb={2} mt={2} align='center' style={{ color: '#046582', fontFamily: 'Permanent Marker' }}>
                    {card.title.toUpperCase()}
                  </Typography>
                  <Typography variant='h6' color='text.secondary' align='center' style={{ fontFamily: 'Architects Daughter', fontWeight: '900' }}>
                    {card.date.toDate().toLocaleDateString()}
                  </Typography>
                  <Typography variant='body1' color='text.primary' style={{ fontFamily: 'Architects Daughter' }}>
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
                <CardActions disableSpacing style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div>
                    <IconButton size='small' color='error' disabled={!user} onClick={() => {}} aria-label='add to favorites'>
                      <Likes card={card} user={user} />
                    </IconButton>
                    <IconButton size='small' disabled={!user} onClick={e => setOpen(true)} aria-label='comment'>
                      <ChatBubbleOutlineIcon fontSize='large' />
                      &nbsp; {card.comments?.length || 0}
                    </IconButton>
                  </div>
                  {user?.uid === card?.uid && (
                    <div>
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
            <Typography style={{ fontFamily: 'Permanent Marker', marginLeft: '30px' }} variant='h6' sx={{ color: '#046582', mt: 2 }}>
              COMMENTS
            </Typography>
            {!card.comments ? (
              <Grid item xs={12} sm={12} md={12}>
                <Typography style={{ fontFamily: 'Permanent Marker' }} variant='body2' sx={{ color: '#046582' }}>
                  No comments yet...
                </Typography>
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={12}>
                {card.comments.map(comment => (
                  <List sx={{ width: '100%', maxWidth: 1180, bgcolor: 'background.paper' }}>
                    <Comments comment={comment} key={comment.createdAt} />
                  </List>
                ))}
              </Grid>
            )}
          </Grid>
        </Container>
      </Grow>
      <Modal open={open} onClose={e => setOpen(false)}>
        <Box sx={{ ...style, width: 400 }}>
          <Typography className='background double' style={{ fontFamily: 'Permanent Marker' }} variant='h6' align='center' sx={{ my: 2, color: '#046582' }}>
            <span className='span'>COMMENT</span>
          </Typography>
          <TextField label='Comment' color='secondary' placeholder='Please type your comments...' value={input} onChange={event => setInput(event.target.value)} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1
              }
            }}
          >
            <ButtonGroup variant='text' aria-label='text button group'>
              <Button color='error' variant='contained' onClick={e => setOpen(false)}>
                CANCEL
              </Button>
              <Button variant='contained' color='primary' disabled={!input} onClick={addComment} startIcon={<SendIcon />}>
                OKAY
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Details;
