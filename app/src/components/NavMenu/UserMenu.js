import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router';

export const UserMenu = () => {
  const { user, signOut } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose();
    signOut();
    navigate('/login');
  }
  
  const handleSignIn = () => {
    navigate('/login');
  }

  if(!user){
    return (
      <IconButton onClick={handleSignIn}><LoginIcon/></IconButton>
    );
  }

  return (
    <React.Fragment>
        <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* {user && (<MenuItem onClick={handleClose}>Profile</MenuItem>)}
        {user && (<MenuItem onClick={handleClose}>My account</MenuItem>)} */}
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
}