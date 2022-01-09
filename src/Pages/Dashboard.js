import { Container, Grid, Grow, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cards from '../Components/Cards';
import { getAllBlogs } from '../Redux/actions/blogActions';

const Dashboard = ({ setCurrentId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  return (
    <>
      <Typography variant='h4' align='center' sx={{ my: 2, color: '#046582' }}>
        <span>--------- </span>
        <span style={{ fontSize: '3rem' }}>D</span>
        ASHBOARD
        <span> ---------</span>
      </Typography>
      <Grow in>
        <Container>
          <Grid container justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <Cards setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Dashboard;
