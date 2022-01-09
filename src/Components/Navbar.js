import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import usersvg from '../Assets/user.svg';
import { signOutAPI } from '../Redux/actions/userActions';

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  console.log(user);

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
    <AppBar position='static' sx={{ bgcolor: teal[400] }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              <img src='https://d1psgljc389n8q.cloudfront.net/bootcamps/logos/VX6tpIUJa' alt='Bank logo' class='nav__logo' width='30rem' />
            </NavLink>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              <Typography variant='h4' sx={{ my: 2, color: 'white', display: 'block' }}>
                FireBlog App
              </Typography>
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {user?.displayName ? (
                <Typography variant='body1' sx={{ my: 2, color: 'white', display: 'block' }}>
                  {user.displayName}
                </Typography>
              ) : (
                ''
              )}
              &nbsp; &nbsp;
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user && user?.photoURL ? <Avatar alt={user.displayName} src={user.photoURL} /> : <Avatar alt='Remy Sharp' src={usersvg} />}
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
                <>
                  <MenuItem onClick={() => navigate('/profile/userId?=1')}>Profile</MenuItem>
                  <MenuItem onClick={() => navigate('/new-blog')}>New</MenuItem>
                  <MenuItem onClick={() => dispatch(signOutAPI(navigate))}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
                  <MenuItem onClick={() => navigate('/register')}>Register</MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
