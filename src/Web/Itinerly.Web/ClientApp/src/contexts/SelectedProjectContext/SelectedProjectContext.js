import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProjects } from '../ProjectsContext';
import { activitiesService, projectService, expensesService, locationsService } from '../../services/firestore';

const SelectedProjectContext = createContext();

export const SelectedProjectProvider = ({ projectId, children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);
  const [_activities, setActivities] = useState([]);
  const [_expenses, setExpenses] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async (id) => {

      if (id) {
        // Fetch the details for the selected project and set them
        const details = await fetchProjectDetails(id)
        
        setProject(details.project);
        setActivities(details.activities);
        setExpenses(details.expenses);
        setLocations(details.locations);
        setLoading(false);
      }
    }

    setLoading(true);
    fetchData(projectId);
  }, [projectId]);

  // Assuming an API call like:
  const fetchProjectDetails = async (projectId) => {
    const project = (await projectService.fetchProjects()).filter(p => p.id == projectId)[0];
    const activities = await activitiesService.fetchActivities(projectId);
    const expenses = await expensesService.fetchExpenses(projectId);
    const locations = await locationsService.fetchLocations(projectId);

    return {
      project: project,
      activities: activities,
      expenses: expenses,
      locations: locations
    };
  };

  const updateActivity = async (activity) => {
    await activitiesService.updateActivity(activity);
    setActivities(prev => prev.map(a => a.id == activity.id ? activity : a));
  }

  const updateExpenses = async (updates) => {
    const updatesById = new Map(updates.map(e => [e.id, e]));
    await expensesService.updateExpenses(updates);
    setExpenses(prev => prev.map(e => ({...e, ...updatesById.get(e.id)})));
  }

  return (
    <SelectedProjectContext.Provider value={{ 
      project, loading, error, 
      activities: _activities, 
      expenses: _expenses, 
      locations, 
      updateActivity, updateExpenses }}>

      {children}
    </SelectedProjectContext.Provider>
  );
}

export const useSelectedProject = () => {
  return useContext(SelectedProjectContext);
}
