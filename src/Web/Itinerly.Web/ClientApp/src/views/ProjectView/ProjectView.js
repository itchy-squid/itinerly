import React from 'react';
import { Container, Fab, LinearProgress, Typography }from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSelectedProject } from '../../contexts/SelectedProjectContext';
import { toast } from 'react-toastify';
import { Activity } from '../../components/Activity';
import { useParams } from 'react-router-dom';
import { useProjects } from '../../contexts/ProjectsContext';

export const ProjectView = () => {
  const routeParams = useParams();
  const { selectProjectId, project, activities, expenses, loading, error} = useSelectedProject();

  selectProjectId(routeParams.projectId);

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
