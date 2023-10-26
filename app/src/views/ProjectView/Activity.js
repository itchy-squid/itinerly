import React, { useState } from 'react';
import { 
  Accordion, AccordionDetails, AccordionSummary, Box, Divider, 
  Typography, IconButton, LinearProgress, 
}from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelectedProject } from '../../contexts/SelectedProjectContext';
import { toast } from 'react-toastify';
import { Expenses } from './Expenses';
import { EditableText } from '../../components/editable';
import { cloneDeep } from 'lodash';

export const Activity = ({ initialActivity, initialExpenses, onIsDeleting }) => {
  const { project, updateActivity, updateExpenses } = useSelectedProject();
  const [ updatedActivity, setUpdatedActivity ] = useState({...initialActivity});
  const [ hasUpdates, setHasUpdates ] = useState(false);

  const [ updatedExpenses, setUpdatedExpenses ] = useState(cloneDeep(initialExpenses));
  const { locations } = useSelectedProject();
  const [ expanded, setExpanded ] = useState(false);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ isDeleting, setIsDeleting ] = useState(false);

  const handleAccordionChange = () => {
    return (ev) => {
      if(!isEditing) setExpanded(!expanded);
    }
  }

  const handleEditClick = () => {
    return (ev) => { 
      setIsEditing(true); 
      ev.stopPropagation();
    }
  }

  const handleSaveClick = async (ev) => {
    ev.stopPropagation();
    
    try 
    {
      if(hasUpdates) {
        await updateActivity(updatedActivity);
        await updateExpenses(updatedExpenses);
      }
 
      setIsEditing(false); 
    }
    catch(err)
    {
      console.log(err);
      toast.error('An error occurred while updating the activity.');
    }
  }
  
  const handleCancelClick = () => {
    return (ev) => { 
      setUpdatedActivity({...initialActivity});
      setUpdatedExpenses(initialExpenses);
      setHasUpdates(false);
      setIsEditing(false);
      ev.stopPropagation();
    }
  }

  const handleDeleteClick = () => {
    return (ev) => { 
      onIsDeleting(updateActivity);
    }
  }

  const handlePropertyChange = (ev) => {
    const { name, value } = ev.target;
    setUpdatedActivity({...updatedActivity, [name]: value});
    setHasUpdates(true);
  }

  const handleAddExpense = (expense) => {
    setUpdatedExpenses(prev => [...prev, {...expense, projectId: project.id, activityId: updatedActivity.id}]);
    setHasUpdates(true);
  }

  const handleChangeExpenses = (expenses) => {
    setUpdatedExpenses(expenses);
    setHasUpdates(true);
  }

  if(!updatedActivity) {
    return <LinearProgress/>
  }

  return (
    <Accordion expanded={expanded} onChange={handleAccordionChange()}>      
      <AccordionSummary
          expandIcon={!isEditing ? <ExpandMoreIcon sx={{px: 0.25, mx: 1}} /> : null}
        sx={{my: 0}}
        style={{display: 'flex', margin: 0}}>

          <Box style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box style={{flex: 1}}>
              <EditableText name='name' 
                isEditing={isEditing} 
                value={updatedActivity.name} 
                onChange={handlePropertyChange}
              />
            </Box>
          </Box>

          {expanded && (
            <>
            {
              isEditing ? 
              (
                <>
                  <IconButton 
                    color='primary'
                    sx={{p: 0.25, mx: 1}} 
                    onClick={handleSaveClick}>
                    <CheckIcon/>
                  </IconButton>
                  <IconButton sx={{p: 0.25, mx: 1}} onClick={handleCancelClick()}>
                    <CloseIcon/>
                  </IconButton>
                  <IconButton sx={{p: 0.25, mx: 1}} onClick={handleDeleteClick()}>
                    <DeleteIcon/>
                  </IconButton>
                </>
              )
              : 
              (
                <>
                  <IconButton sx={{p: 0.25, mx: 1}} onClick={handleEditClick()}>
                    <EditIcon/>
                  </IconButton>
                </>
              )
            }
            </>
          )}
      </AccordionSummary>
    
      <AccordionDetails
        style={{ position: 'relative' }}>
          <EditableText name='description' 
            isEditing={isEditing} 
            value={updatedActivity.description} 
            onChange={handlePropertyChange} 
            variant='filled'
            multiline
            fullWidth
            rows={4}/>
        <Divider sx={{m: 1}} />

        <Typography variant="subtitle1" gutterBottom style={{ marginTop: '15px' }}>
          Expenses
        </Typography>
        <Expenses expenses={updatedExpenses} 
          isEditing={isEditing} 
          location={locations.filter(l => l.id === updatedActivity.locationId)[0]}
          onChange={handleChangeExpenses}
          onAdd={handleAddExpense}/>
      </AccordionDetails>
    </Accordion>
  )
}