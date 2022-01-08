import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

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
    <AppBar position='static'>
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
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
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
              {auth ? (
                <>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>New</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleClose}>Login</MenuItem>
                  <MenuItem onClick={handleClose}>Register</MenuItem>
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
