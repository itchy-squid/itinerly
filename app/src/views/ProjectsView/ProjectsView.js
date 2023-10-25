import { useState } from 'react';
import styles from './ProjectsView.module.css';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../contexts/ProjectsContext';
import { Box, Button, Fab, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const ProjectsView = () => {
  const { projects, loading } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
    || project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectClick = (projectId) => {
    // Navigate to the detailed view
    navigate(`/projects/${projectId}`);
  };

  if (loading) return <LinearProgress />;  // Assuming you have a Loading component

  const xsSize = 12;
  const smSize = 6;
  const mdSize = 4;
  const lgSize = 3

  return (
    <Box p={0}>
      <Box className={styles.projectsBanner} 
        sx={{ height: { xs: '200px', md: '300px', lg: '450px' } }}
        mb={2}
        />

      <Grid container rowSpacing={2}
        my={2}>
        {(filteredProjects.length > 4) && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search Projects"
              variant="outlined"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </Grid>
        )}

        <Grid item xs={xsSize} sm={smSize} md={mdSize} lg={lgSize}>
          <Box className={[styles.projectCardContents,styles.recentProjectsCardContents]}
                >
                
            <Box className={styles.projectCardHeader}>
              <Typography variant='h3' component="div">
                Recent Projects
              </Typography>
            </Box>

            <Box className={styles.recentProjectsCardBody}>
            </Box>
          </Box>
        </Grid>

        {filteredProjects.map(({id, name, description}) => (
          <Grid item key={id} className={styles.projectCard} 
            xs={xsSize}
            sm={smSize}
            md={mdSize}
            lg={lgSize}>

            <Box className={styles.projectCardContents}
              mx={3}
              mb={3}
              mt={0}>

              <Box className={styles.projectCardHeader} 
                px={2}
                mb={2}>
                <Typography variant='h5' component="div">{name}</Typography>
              </Box>

              <Box className={styles.projectCardBody}
                p={2}
              >
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
                <Button size="small" onClick={() => handleProjectClick(id)}>
                  Continue
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
        
        <Fab 
          color="primary" 
          aria-label="add" 
          sx={{ m: 4 }}
          style={{ position: 'fixed', bottom: 0, right: 0 }} >
          <AddIcon />
        </Fab>
      </Grid>
    </Box>
  );
}

