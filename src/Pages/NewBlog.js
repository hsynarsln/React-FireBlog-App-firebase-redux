import { Avatar, Grid, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';
import React from 'react';
import BlogForm from '../Components/BlogForm';

const NewBlog = () => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <Avatar style={{ margin: 'auto' }} sx={{ bgcolor: teal[400], width: 240, height: 240 }}>
        <img src='https://eds-fireblog.herokuapp.com/static/media/blok.7e6674a5.png' alt='new blog' />
      </Avatar>
      <Typography className='caption' variant='h4' align='center' sx={{ my: 2, color: '#046582' }}>
        <span>------ </span>
        <span style={{ fontSize: '3rem' }}>N</span>
        EW
        <span style={{ fontSize: '3rem' }}> B</span>
        LOG
        <span> ------</span>
      </Typography>
      <Grid container justifyContent='center' alignItems='flex-start'>
        <Grid item xs={12} sm={8} md={4}>
          <BlogForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default NewBlog;
