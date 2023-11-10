import React, { useState } from 'react';
import moment from 'moment';
import { Calendar } from './Calendar';
import { TIME_UNITS } from '../../constants';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { ActivitiesList } from './ActivitiesList';
import { selectActivities } from '../../state/activities';
import { useSelector } from 'react-redux';

export const ItineraryView = () => {
  const activities = useSelector(selectActivities);
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  console.log(activities);
  const days = activities.map(ev => moment(ev.start).startOf(TIME_UNITS.DAY).toDate());

  return (
    <Grid container>
      <Grid item md={4} lg={2} xxl={1}>
        <Stack pr={1}>
          <Typography variant='h3'>Itinerary</Typography>
          <Typography variant='body'>List itinerary details and activities.</Typography>
          
          <Divider sx={{my: 2}}/>

          <ActivitiesList 
            activities={activities} 
            selectedIndex={selectedIndex} 
            onIndexSelected={setSelectedIndex}/>
        </Stack>
      </Grid>

      <Grid item md={8} lg={10} xxl={11}>
        <Stack>            
          <Calendar activities={activities} days={days}/>
        </Stack>
      </Grid>
      
    </Grid>
  );
}
