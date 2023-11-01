import React, { useState } from 'react';
import { navRoutes } from '../../AppRoutes.js';
import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './NavMenu.module.css';
import { useSelectedProject } from '../../contexts/SelectedProjectContext/SelectedProjectContext.js';
import { UserMenu } from './UserMenu.js';

export const NavMenu = () => {
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);
  const { project } = useSelectedProject();

  const drawerWidth = 200;

  const handleSideMenuToggle = (ev) => {
    setSideMenuIsOpen(prev => !prev);
  }

  const drawer = (
    <Box onClick={handleSideMenuToggle}>
      <Box sx={{
        display: 'flex',
        bgcolor: 'background.paper',
        color: 'text.secondary',
        border: (theme) => `1px solid ${theme.palette.divider}`
      }}>
        <Box className={styles.companyIcon} p={2} my={1} ml={1} mr={.5}/>
        <Typography className={styles.companyName} 
          variant="h5" 
          sx={{ 
            my: 'auto'
          }}>
          itinerly
        </Typography>
      </Box>

      <Divider variant='middle' /> 

      <List>
        {navRoutes.map((item,idx) => (
          <ListItem key={idx} disablePadding>
            <ListItemButton to={item.path} py={0}>
              {item.name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
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
            onClick={handleSideMenuToggle}
            sx={{mr: 2}}>
            <MenuIcon/>
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Typography variant='h6' sx={{flexGrow: 1}}>
              {project && project.name}
            </Typography>
            <UserMenu/>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={sideMenuIsOpen}
          onClose={handleSideMenuToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            //display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}
