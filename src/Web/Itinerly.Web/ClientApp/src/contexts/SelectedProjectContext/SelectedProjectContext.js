import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProjects } from '../ProjectsContext';
import { activityService, projectService } from '../../services/firestore';

const SelectedProjectContext = createContext();

export const SelectedProjectProvider = ({ children }) => {
  const { selectedProjectId } = useProjects();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    setLoading(true);

    if (selectedProjectId) {
      // Fetch the details for the selected project and set them
      fetchProjectDetails(selectedProjectId)
      .then(({ project, activities }) => { 
        setProject(project);
        setActivities(activities) 
        setLoading(false);
      });
    }
  }, [selectedProjectId]);

  // Assuming an API call like:
  const fetchProjectDetails = async (projectId) => {
    const project = (await projectService.fetchProjects()).filter(p => p.id == projectId)[0];
    const activities = await activityService.getActivities(projectId);

    return {
      project: project,
      activities: activities
    };
  };

  return (
    <SelectedProjectContext.Provider value={{ project, loading, activities }}>
      {children}
    </SelectedProjectContext.Provider>
  );
}

export const useSelectedProject = () => {
  return useContext(SelectedProjectContext);
}
