import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BlogForm from '../Components/BlogForm';

const UpdateBlog = ({ currentId, setCurrentId }) => {
  const [card, setCard] = useState();
  const { id } = useParams();
  const cards = useSelector(state => state.blogReducer.blogData);

  useEffect(() => {
    setCard(cards.find(c => c.id == id));
  }, [card]);

  return (
    <div style={{ marginTop: '2rem' }}>
      <Typography align='center'>
        <img src={card?.imageURL} alt='update blog' width='500rem' />
      </Typography>
      <Typography variant='h4' align='center' sx={{ my: 2, color: '#046582' }}>
        <span>--------- </span>
        <span style={{ fontSize: '3rem' }}>U</span>
        PDATE
        <span style={{ fontSize: '3rem' }}> B</span>
        LOG
        <span> ---------</span>
      </Typography>
      <Grid container justifyContent='center' alignItems='flex-start'>
        <Grid item xs={12} sm={8} md={4}>
          <BlogForm currentId={currentId} setCurrentId={setCurrentId} card={card} />
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateBlog;
