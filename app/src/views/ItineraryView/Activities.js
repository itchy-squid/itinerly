import React from 'react';
import { List, ListItemButton, ListItemText, ListSubheader } from '@mui/material';

export const Activities = ({activities, selectedIndex, onIndexSelected}) => {
  const handleListItemClick = (index) => {
    return () => { onIndexSelected(index); }
  };

  return (
    <List
      dense
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Activities
        </ListSubheader>
      }>
      
      {activities && activities.map((a, idx) => (
        <ListItemButton 
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