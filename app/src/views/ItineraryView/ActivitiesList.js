import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@mui/material';

export const ActivitiesList = ({activities, selectedIndex, onIndexSelected}) => {
  const handleListItemClick = (index) => {
    return () => { onIndexSelected(index); }
  };

  return (
    <List
      subheader={
        <ListSubheader sx={{px: 0}} component="div" id="nested-list-subheader">
          Activities
        </ListSubheader>
      }>
      
      {activities && activities.map((a, idx) => (
        <ListItemButton 
          sx={{px: 0}}
          key={idx}
          selected={selectedIndex === idx }
          onClick={handleListItemClick(idx)}
        >
          <ListItemText primary={a.name}/>
        </ListItemButton>
      ))}
    </List>
    );
}