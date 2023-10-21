import React, { useState } from 'react';
import { Box, Container, Fab, LinearProgress, Paper, TextField, Typography }from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { SelectedProjectProvider, useSelectedProject } from '../../contexts/SelectedProjectContext';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Activity } from './Activity'
import { clone } from 'lodash';

export const ProjectView = () => {
  const routeParams = useParams();

  return (
    <SelectedProjectProvider projectId={routeParams.projectId}>
      <Project/>
    </SelectedProjectProvider>
  );
}

const emptyActivity = {
  name: ''
}

export const Project = () => {
  const { project, activities, expenses, loading, error, addActivities } = useSelectedProject();
  const [ isAdding, setIsAdding ] = useState(false);
  const [ newActivities, setNewActivities ] = useState([]);

  if(loading) {
    return <LinearProgress/>
  }

  if(error){
    toast.error(error);
    return <></>
  }

  const handleAddClick = () => {
    if(!isAdding) setIsAdding(true);
  }

  const handleConfirmAddClick = async () => 
  {
    try{
      if(!isAdding) return;
    
      setIsAdding(false);
      await addActivities(newActivities);
      setNewActivities([]);
    }
    catch(err)
    {
      console.log(err);
      toast.error('An error occurred while updating the activity.');
    }
  }

  const handleCancelAddClick = () => 
  {
    setIsAdding(false);
    setNewActivities([]);
  }

  const handleTextChangeNewActivity = (activity, idx) => {
    return (ev) => 
    {
      const { value } = ev.target;

      if(idx >= newActivities.length){
        setNewActivities(prev => [...prev, {name: value}]);
      }
      else {
            
        // update case
        const updatedNewActivities = clone(newActivities);
        updatedNewActivities[idx] = {name: value};
        setNewActivities(updatedNewActivities);
      }
    }
  }

  return (
      <Container>
        <Typography variant="h4" gutterBottom>
          {project.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {project.description}
        </Typography>

        {activities.map((activity, index) => (
          <Activity 
            key={index} 
            project={project}
            initialActivity={activity} 
            initialExpenses={expenses.filter(e => e.activityId === activity.id)}/>
        ))}

        {isAdding && [...newActivities, emptyActivity].map((a, idx) => (
          <Paper elevation={1} key={idx}>
            <TextField size='medium' value={a.name} onChange={handleTextChangeNewActivity(a, idx)}/>
          </Paper>
        ))}

        <Box sx={{ m: 4 }} style={{ position: 'fixed', bottom: 0, right: 0 }} >
          <Fab 
            color='primary'
            aria-label='add'
            size='small'
            onClick={handleAddClick}>
            <AddIcon />
          </Fab>
          {isAdding && (
            <>
              <Fab 
                sx={{ml: 4}}
                color='secondary'
                size='small'
                aria-label='confirm'
                onClick={handleConfirmAddClick}>
                <CheckIcon />
              </Fab>
              
              <Fab 
                sx={{ml: 4}}
                size='small'
                aria-label='cancel'
                onClick={handleCancelAddClick}>
                <ClearIcon />
              </Fab>
            </>
          )}
        </Box>
      </Container>
  );
}
