import { Avatar, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector(state => state.userReducer.user);
  // console.log(user);

  return (
    <Grid container alignItems='center' justifyContent='center' mt={3}>
      <Grid item xs={12} md={8} sm={10} alignItems='center' justifyContent='center'>
        <Card sx={{ maxWidth: 1180 }}>
          <Stack justifyContent='center' alignItems='center' mt={3}>
            {user?.photoURL ? <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 100, height: 100 }} /> : <Avatar alt={user.displayName.toUpperCase()} src='/static/images/avatar/2.jpg' sx={{ width: 100, height: 100, bgcolor: blue[500] }} />}
          </Stack>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div' mt={2}>
              Display Name
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {user?.displayName}
            </Typography>
            <Typography gutterBottom variant='h5' component='div' mt={2}>
              Phone Number
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {user?.phoneNumber || null}
            </Typography>
            <Typography gutterBottom variant='h5' component='div' mt={2}>
              Email
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {user?.email || null}
            </Typography>
            <Typography gutterBottom variant='h5' component='div' mt={2}>
              Joined At
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {user?.metadata.creationTime || null}
            </Typography>
            <Typography gutterBottom variant='h5' component='div' mt={2}>
              Last Sign In Time
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {user?.metadata.lastSignInTime || null}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
