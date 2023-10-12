import { Fragment, useState } from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import {Box, Card, CardActions, CardContent, Divider, Fab, Grid, LinearProgress, List, ListItem, ListItemButton, ListItemText, ListSubheader, TextField, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export const ProjectsView = () => {
  const { projects, loading, selectProject } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
    || project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LinearProgress />;  // Assuming you have a Loading component

  return (
    <Box p={2}>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Search Projects"
          variant="outlined"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Box>

      <List>
      {filteredProjects.map((project) => (
        <Fragment key={project.id}>
          <ListItemButton onClick={() => selectProject(project)}>
            <ListItemText primary={project.name} secondary={project.description}/>
          </ListItemButton>
        </Fragment>
      ))}
      </List>
      
      <Fab 
        color="primary" 
        aria-label="add" 
        style={{ position: 'fixed', bottom: '2rem', right: '2rem' }} 
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

