import { Container, Grid, Grow, Typography } from '@mui/material';
import React from 'react';
import Cards from '../Components/Cards';

const Dashboard = ({ setCurrentId }) => {
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
