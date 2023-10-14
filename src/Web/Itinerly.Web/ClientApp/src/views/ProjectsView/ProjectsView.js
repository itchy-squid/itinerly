import { Fragment, useState } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useProjects } from '../../contexts/ProjectsContext';
import { Box, Fab, LinearProgress, List, ListItemButton, ListItemText, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const ProjectsView = () => {
  const { projects, loading, onSelectProject } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
    || project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectClick = (projectId) => {
    onSelectProject(projectId);
    
    // Navigate to the detailed view
    navigate(`/projects/${projectId}`);
  };

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
      {filteredProjects.map(({id, name, description}) => (
        <Fragment key={id}>
          <ListItemButton onClick={() => handleProjectClick(id)}>
            <ListItemText primary={name} secondary={description}/>
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

