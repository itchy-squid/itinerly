import React, { createContext, useContext, useState, useEffect } from 'react';
import { activitiesService, projectService, expensesService } from '../../services/firestore';

const SelectedProjectContext = createContext();

export const SelectedProjectProvider = ({ children }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);
  const [_activities, setActivities] = useState([]);
  const [_expenses, setExpenses] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        // Fetch the details for the selected project and set them
        const details = await fetchProjectDetails(id)
                
        setProject(details.project);
        setActivities(details.activities);
        // setExpenses(details.expenses);
        // setLocations(details.locations);
        setLoading(false);
      }
      catch (err) {
        setProject(null);
        setActivities([]);
        setExpenses([]);
        setLocations([]);
        setLoading(false);
        setError('User or project not found');
      }
    }

    if(selectedProjectId) fetchData(selectedProjectId);
  }, [selectedProjectId]);

  // Assuming an API call like:
  const fetchProjectDetails = async (projectId) => {
    const project = await projectService.fetchProject(projectId);
    const activities = await activitiesService.fetchActivities(projectId);
    const expenses = await expensesService.fetchExpenses(projectId);
    // const locations = await locationsService.fetchLocations(projectId);

    return {
      project: project,
      activities: activities,
      // expenses: expenses,
      // locations: locations
    };
  };

  const addActivities = async (newActivities) => 
  {
    await activitiesService.addActivities(newActivities.map((a) => { 
      return {
        projectId: project.id,
        name: a.name
      };
    }))
    const activities = await activitiesService.fetchActivities(selectedProjectId);
    setActivities(activities);
  }

  const updateActivity = async (activity) => {
    await activitiesService.updateActivity(activity);
    const activities = await activitiesService.fetchActivities(selectedProjectId);
    setActivities(activities);
  }

  const updateExpenses = async (updates) => {
    await expensesService.updateExpenses(updates);
    const expenses = await expensesService.fetchExpenses(selectedProjectId);
    setExpenses(expenses);
  }

  return (
    <SelectedProjectContext.Provider value={{ 
      project, loading, error, 
      activities: _activities, 
      expenses: _expenses, 
      locations, 
      setSelectedProjectId,
      addActivities,
      updateActivity, 
      updateExpenses 
      }}>

      {children}
    </SelectedProjectContext.Provider>
  );
}

export const useSelectedProject = () => {
  const context = useContext(SelectedProjectContext);
  
  if (!context) {
    throw new Error('useSelectedProject must be used within a SelectedProjectProvider');
  }

  return context;
}
