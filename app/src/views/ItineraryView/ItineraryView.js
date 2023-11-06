import React, { useState } from 'react';
import { useSelectedProject } from '../../contexts/SelectedProjectContext';
import moment from 'moment';
import { Calendar } from './Calendar';
import { TIME_UNITS } from '../../constants';
import { Grid, Stack } from '@mui/material';
import { Activities } from './Activities';

export const ItineraryView = () => {
  const { activities } = useSelectedProject();
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const days = activities.map(ev => moment(ev.start).startOf(TIME_UNITS.DAY).toDate());

  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={4} lg={2} xxl={1}>
          <Stack pr={1}>

            <Activities activities={activities} selectedIndex={selectedIndex} onIndexSelected={setSelectedIndex}/>
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
    </React.Fragment>
  );
}
