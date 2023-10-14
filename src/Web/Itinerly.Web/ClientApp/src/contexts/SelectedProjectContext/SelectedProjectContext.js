import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProjects } from '../ProjectsContext';
import { activityService, projectService } from '../../services/firestore';
import { expensesService } from '../../services/firestore/expensesService';

const SelectedProjectContext = createContext();

export const SelectedProjectProvider = ({ children }) => {
  const { selectedProjectId } = useProjects();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);
  const [activities, setActivities] = useState(null);
  const [expenses, setExpenses] = useState(null);

  useEffect(() => {
    const fetchData = async (projectId) => {

      if (projectId) {
        // Fetch the details for the selected project and set them
        const details = await fetchProjectDetails(projectId)
        
        setProject(details.project);
        setActivities(details.activities);
        setExpenses(details.expenses);
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

    let expenses = null;
    if(activities) {
      expenses = await expensesService.fetchExpenses(activities.map(a => a.id));
    }

    return {
      project: project,
      activities: activities,
      expenses: expenses
    };
  };

  return (
    <SelectedProjectContext.Provider value={{ project, loading, error, activities, expenses }}>
      {children}
    </SelectedProjectContext.Provider>
  );
}

export const useSelectedProject = () => {
  return useContext(SelectedProjectContext);
}
