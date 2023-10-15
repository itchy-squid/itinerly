import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProjects } from '../ProjectsContext';
import { activityService, projectService, expensesService, locationsService } from '../../services/firestore';

const SelectedProjectContext = createContext();

export const SelectedProjectProvider = ({ children }) => {
  const { selectedProjectId } = useProjects();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);
  const [activities, setActivities] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async (projectId) => {

      if (projectId) {
        // Fetch the details for the selected project and set them
        const details = await fetchProjectDetails(projectId)
        
        setProject(details.project);
        setActivities(details.activities);
        setExpenses(details.expenses);
        setLocations(details.locations);
        setLoading(false);
      }
    }

    setLoading(true);
    fetchData(selectedProjectId);

  }, [selectedProjectId]);

  // Assuming an API call like:
  const fetchProjectDetails = async (projectId) => {
    const project = (await projectService.fetchProjects()).filter(p => p.id == projectId)[0];
    const activities = await activityService.getActivities(projectId);
    const expenses = await expensesService.fetchExpenses(projectId);
    const locations = await locationsService.fetchLocations(projectId);

    return {
      project: project,
      activities: activities,
      expenses: expenses,
      locations: locations
    };
  };

  return (
    <SelectedProjectContext.Provider value={{ project, loading, error, activities, expenses, locations }}>
      {children}
    </SelectedProjectContext.Provider>
  );
}

export const useSelectedProject = () => {
  return useContext(SelectedProjectContext);
}
