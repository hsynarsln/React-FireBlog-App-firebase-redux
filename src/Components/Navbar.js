import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.jpg';
import usersvg from '../Assets/user.svg';
import { getUser, signOutAPI } from '../Redux/actions/userActions';

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='fixed' sx={{ bgcolor: grey[800] }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              <Avatar alt='Bank Logo' src={logo} sx={{ width: { xs: 50, sm: 50, md: 50 }, height: 50 }} />
            </NavLink>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              <Typography style={{ fontFamily: 'Permanent Marker' }} variant='h3' sx={{ my: 1, color: 'white', display: { xs: 'none', md: 'flex' } }}>
                FireBlog App
              </Typography>
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {user?.displayName ? (
                <Typography variant='body1' sx={{ color: 'white', display: 'block' }} style={{ fontFamily: 'Architects Daughter' }}>
                  {user?.displayName.split(' ')[0].toUpperCase()}
                </Typography>
              ) : (
                ''
              )}
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user ? <Avatar alt={user.displayName?.toUpperCase()} src={user.photoURL || '/static/images/avatar/2.jpg'} sx={{ bgcolor: blue[500] }} /> : <Avatar alt='Remy Sharp' src={usersvg} />}
                </IconButton>
              </Tooltip>
            </div>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user?.displayName ? (
                <div>
                  <MenuItem onClick={() => navigate(`/profile/${user.uid}`)}>Profile</MenuItem>
                  <MenuItem onClick={() => navigate('/new-blog')}>New</MenuItem>
                  <MenuItem onClick={() => dispatch(signOutAPI(navigate))}>Logout</MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
                  <MenuItem onClick={() => navigate('/register')}>Register</MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
