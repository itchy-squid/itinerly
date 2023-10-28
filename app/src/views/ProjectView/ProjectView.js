import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Dialog, DialogTitle, 
  Fab, LinearProgress, Paper, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelectedProject } from '../../contexts/SelectedProjectContext';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Activity } from './Activity'
import { clone } from 'lodash';

export const ProjectView = () => {
  const { setSelectedProjectId } = useSelectedProject();
  const { projectId } = useParams();

  useEffect(() => {
    setSelectedProjectId(projectId);
  }, [projectId, setSelectedProjectId])

  return (
    <Project/>
  );
}

const emptyActivity = {
  name: ''
}

export const Project = () => {
  const { project, activities, expenses, loading, error, addActivities } = useSelectedProject();
  const [ isAdding, setIsAdding ] = useState(false);
  const [ newActivities, setNewActivities ] = useState([]);
  const [ deletingActivity, setDeletingActivity ] = useState(null);

  if(loading) {
    return <LinearProgress/>
  }

  if(error){
    toast.error(error);
    return <></>
  }

  if(!project){
    toast.error('what?');
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

  const handleIsDeleting = (activity) => {
    setDeletingActivity(activity);
  }

  const handleConfirmDeleteClick = () => {
    handleCancelDeleteClick();
  }

  const handleCancelDeleteClick = () => {
    setDeletingActivity(null);
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
            initialExpenses={expenses.filter(e => e.activityId === activity.id)}
            onIsDeleting={handleIsDeleting}
            />
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

        <Dialog open={deletingActivity !== null}>
          <DialogTitle>Discard activity?</DialogTitle>
          <Box mx={3} mb={2}>
            <Stack mt={2} ml={16} direction='row' spacing={2}>
              <Button onClick={handleCancelDeleteClick}>Cancel</Button>
              <Button onClick={handleConfirmDeleteClick} color='error' startIcon={<DeleteIcon/>} variant='contained'>
                Discard
              </Button>
            </Stack>
          </Box>
        </Dialog>
      </Container>
  );
}
