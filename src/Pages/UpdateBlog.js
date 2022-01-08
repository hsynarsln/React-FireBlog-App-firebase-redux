import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import BlogForm from '../Components/BlogForm';
import { cards } from '../Helpers/data';

const UpdateBlog = ({ currentId, setCurrentId }) => {
  const { id } = useParams();
  let card = cards.find(c => c.id == id);

  return (
    <div style={{ marginTop: '2rem' }}>
      <Typography align='center'>
        <img src={card.imageURL} alt='update blog' width='500rem' />
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
