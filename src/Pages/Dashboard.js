import { Container, Grid, Grow, Typography } from '@mui/material';
import React from 'react';
import Cards from '../Components/Cards';

const Dashboard = ({ setCurrentId }) => {
  return (
    <>
      <Typography style={{ fontFamily: 'Qwitcher Grypen' }} variant='h3' align='center' sx={{ my: 2, color: '#046582' }}>
        <span>------ </span>
        DASHBOARD
        <span> ------</span>
      </Typography>
      <Grow in>
        <Container>
          <Grid container justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <Cards />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Dashboard;
