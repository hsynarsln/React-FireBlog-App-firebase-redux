import { Grid, LinearProgress } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import BlogCard from './BlogCard';

const Cards = ({ setCurrentId }) => {
  // console.log(cards);

  const cards = useSelector(state => state.blogReducer.blogData);

  return !cards ? (
    <LinearProgress />
  ) : (
    <Grid container rowSpacing={3} columnSpacing={{ sm: 2, md: 3 }} alignItems='stretch' spacing={3}>
      {cards.map(card => (
        <Grid key={card.id} item xs={12} md={4} sm={6}>
          <BlogCard card={card} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
