import { Grid, LinearProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../Redux/actions/blogActions';
import BlogCard from './BlogCard';

const Cards = () => {
  // console.log(cards);

  const cards = useSelector(state => state.blogReducer.blogData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);
  // console.log(cards);

  return !cards ? (
    <LinearProgress color='inherit' />
  ) : (
    <Grid container rowSpacing={3} columnSpacing={{ sm: 2, md: 3 }} alignItems='stretch' spacing={3}>
      {cards?.map(card => (
        <Grid item key={card.id} xs={12} md={4} sm={6} justifyContent='center'>
          <BlogCard card={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
