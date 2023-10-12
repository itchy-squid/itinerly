import React, { createContext, useState, useEffect, useContext } from 'react';
import { projectService } from '../../services/firestore';

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProjects() {
            const data = await projectService.fetchProjects();
            setProjects(data);
            setLoading(false);
        }
        loadProjects();
    }, []);

    const selectProject = (project) => {
      // Handle project selection
    };

    return (
        <ProjectContext.Provider value={{ projects, loading, selectProject }}>
            {children}
        </ProjectContext.Provider>
    );
}

const useProjects = () => {
  return useContext(ProjectContext);
}

export { ProjectContext as ProjectsContext, ProjectProvider as ProjectsProvider, useProjects };
