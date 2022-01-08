import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import BlogCard from './BlogCard';

const cards = [
  {
    id: 1,
    title: 'title',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.',
    email: 'test@gmail.com',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR922cm8zCyReyOOueD-bGvoz4O7DFDfFZRRA&usqp=CAU',
    date: '08/01/2022',
    likes: []
  },
  {
    id: 2,
    title: 'title',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.',
    email: 'test@gmail.com',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR922cm8zCyReyOOueD-bGvoz4O7DFDfFZRRA&usqp=CAU',
    date: '08/01/2022',
    likes: ['hbjklkl', 'klşhlş', 'lkhlk']
  },
  {
    id: 3,
    title: 'title',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.',
    email: 'test@gmail.com',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR922cm8zCyReyOOueD-bGvoz4O7DFDfFZRRA&usqp=CAU',
    date: '08/01/2022',
    likes: []
  },
  {
    id: 4,
    title: 'title',
    description: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.',
    email: 'test@gmail.com',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR922cm8zCyReyOOueD-bGvoz4O7DFDfFZRRA&usqp=CAU',
    date: '08/01/2022',
    likes: []
  }
];

const Cards = ({ setCurrentId }) => {
  // console.log(cards);

  return !cards.length ? (
    <CircularProgress />
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
