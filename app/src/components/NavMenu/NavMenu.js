import React, { Component, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { navRoutes } from '../../AppRoutes.js';
import { AppBar, Box, Button, CssBaseline, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <AppBar
      color='inherit' 
      sx={{minHeight: 0}}
      elevation={0}
      position='static'>
      <Toolbar sx={{minHeight: 0}}>
        <IconButton size='small'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{mr: 2}}>
          <MenuIcon/>
        </IconButton>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Typography variant='h6' sx={{flexGrow: 1}}>
            itinerly
          </Typography>
          {navRoutes.map((item, idx) => (
            <Button key={idx} to={item.path} component={RouterLink}>
              {item.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
