import React, { createContext, useState, useEffect, useContext } from 'react';
import { projectService } from '../../services/firestore';
import { useUser } from '../UserContext';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const {user} = useUser();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function loadProjects(userId) {

        if(userId){
          const data = await projectService.fetchProjects(userId);
          setProjects(data);
        }

        else {
          setProjects([]);
        }

        setLoading(false);
      }

      loadProjects(user?.uid);
  }, [user]);

  return (
      <ProjectsContext.Provider value={{ projects, loading }}>
          {children}
      </ProjectsContext.Provider>
  );
}

const useProjects = () => {
  return useContext(ProjectsContext);
}

export { ProjectsContext, ProjectsProvider, useProjects };
