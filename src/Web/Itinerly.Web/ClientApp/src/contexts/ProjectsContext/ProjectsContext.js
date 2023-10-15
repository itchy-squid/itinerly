import React, { createContext, useState, useEffect, useContext } from 'react';
import { projectService } from '../../services/firestore';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    useEffect(() => {
        async function loadProjects() {
            const data = await projectService.fetchProjects();
            setProjects(data);
            setLoading(false);
        }
        loadProjects();
    }, []);

    return (
        <ProjectsContext.Provider value={{ projects, loading, selectedProjectId, setSelectedProjectId }}>
            {children}
        </ProjectsContext.Provider>
    );
}

const useProjects = () => {
  return useContext(ProjectsContext);
}

export { ProjectsContext, ProjectsProvider, useProjects };
