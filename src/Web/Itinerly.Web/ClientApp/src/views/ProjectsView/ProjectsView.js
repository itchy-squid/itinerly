import React, { useContext } from 'react';
import { ProjectsContext } from '../../contexts/ProjectsContext';
import {LinearProgress} from '@mui/material';

export const ProjectsView = () => {
  const { projects, loading } = useContext(ProjectsContext);

  if (loading) return <LinearProgress />;  // Assuming you have a Loading component

  return (
      <div>
          {projects.map(project => (
              <div key={project.id}>
                  {project.name}
              </div>
          ))}
      </div>
  );
}

