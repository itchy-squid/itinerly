import React, { useState } from 'react';
import { useSelectedProject } from '../../contexts/SelectedProjectContext';
import moment from 'moment';
import { Calendar } from './Calendar';
import { TIME_UNITS } from '../../constants';
import { Grid, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';

export const ItineraryView = () => {
  const { activities } = useSelectedProject();
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const days = activities.map(ev => moment(ev.start).startOf(TIME_UNITS.DAY).toDate());

  const handleListItemClick = (index) => {
    return () => { setSelectedIndex(index); }
  };

  return (
    <Grid container>
      <Grid item md={4} lg={2} xxl={1}>
        <Stack>
          <Typography h4>Activities</Typography>

          <List>
            {activities && activities.map((a, idx) => (
              <ListItemButton 
                key={idx}
                selected={selectedIndex === idx }
                onClick={handleListItemClick(idx)}
              >
                <ListItemText 
                  primary={a.name}/>
              </ListItemButton>
            ))}
          </List>
        </Stack>
      </Grid>

      <Grid item md={8} lg={10} xxl={11}>
        <Stack>
          <h1 id="tableLabel">Itinerary</h1>
          <p>List itinerary details and activities.</p>
          
          <Calendar activities={activities} days={days}/>
        </Stack>
      </Grid>
      
    </Grid>
  );
}
