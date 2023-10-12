import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProjects } from '../ProjectsContext';

const SelectedProjectContext = createContext();

export const SelectedProjectProvider = ({ children }) => {
  const { selectedProjectId } = useProjects();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (selectedProjectId) {
      // Fetch the details for the selected project and set them
      fetchProjectDetails(selectedProjectId).then(details => {
        setProject(details);
      });
    }
  }, [selectedProjectId]);

  // Assuming an API call like:
  const fetchProjectDetails = async (projectId) => {
    console.log(`fetching project ${projectId}...`)
    // do a thing
  };

  return (
    <SelectedProjectContext.Provider value={{ project }}>
      {children}
    </SelectedProjectContext.Provider>
  );
}

export const useSelectedProject = () => {
  return useContext(SelectedProjectContext);
}
