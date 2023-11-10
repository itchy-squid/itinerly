import React, { useEffect } from 'react';
import { useSelectedProject } from '../../contexts/SelectedProjectContext';
import { Outlet, useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { NotFound } from '../../components/NotFound/NotFound';
import { fetchAsync } from '../../state/activities';
import { useDispatch } from 'react-redux';

export const ProjectOutlet = () => {
  const { error, loading, project, setSelectedProjectId } = useSelectedProject();
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedProjectId(projectId);
    dispatch(fetchAsync(projectId));
  }, [projectId, setSelectedProjectId, dispatch])

  if(loading) {
    return <LinearProgress/>
  }

  if(error){
    toast.error(error);
    return <></>
  }

  if(!project){
    return <NotFound/>;
  }

  return (
    <Outlet/>
  );
}