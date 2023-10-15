import React from 'react';
import { Container, Fab, LinearProgress, Typography }from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { SelectedProjectProvider, useSelectedProject } from '../../contexts/SelectedProjectContext';
import { toast } from 'react-toastify';
import { Activity } from '../../components/Activity';
import { useParams } from 'react-router-dom';

export const ProjectView = () => {
  const routeParams = useParams();

  return (
    <SelectedProjectProvider projectId={routeParams.projectId}>
      <Project/>
    </SelectedProjectProvider>
  );
}

export const Project = () => {
  const { project, activities, expenses, loading, error} = useSelectedProject();

  if(loading) {
    return <LinearProgress/>
  }

  if(error){
    toast.error(error);
    return <></>
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
            expenses={expenses.filter(e => e.activityId == activity.id)} />
        ))}

        <Fab 
          color="primary" 
          aria-label="add" 
          sx={{ m: 4 }}
          style={{ position: 'fixed', bottom: 0, right: 0 }} >
          <AddIcon />
        </Fab>
      </Container>
  );
}
