import React, { Fragment, useEffect, useState } from 'react';
import { 
  Accordion, AccordionDetails, AccordionSummary, Box, Divider, List, ListItem, 
  Table, TableBody, TableCell, TableHead, TableRow, Typography, Checkbox, IconButton, makeStyles, TextField, LinearProgress, 
}from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelectedProject } from '../../contexts/SelectedProjectContext';
import moment from 'moment';
import { cloneDeep }from 'lodash';

const StyledTableCell = (props) => {
  return (<TableCell sx={{py: 1}} {...props}>{props.children}</TableCell>);
}

export const Activity = ({ initialActivity, expenses }) => {
  const [ updatedActivity, setUpdatedActivity ] = useState({...initialActivity});

  // const { updatedExpenses, setUpdatedExpenses } = useState(expenses);
  const { locations } = useSelectedProject();
  const [ expanded, setExpanded ] = useState(false);
  const [ isEditing, setIsEditing ] = useState(false);

  const calculateExpense = (expense) => {
    const location = locations.filter(l => l.id === updatedActivity.locationId)[0];

    const baseCost = expense.unitCost * expense.units;
    const taxMultiplier = (1 + (expense.hasTax ? (location.tax / 100.0) : 0));
    const tipMultiplier = (1 + (expense.hasTip ? (location.tip / 100.0) : 0));

    return baseCost * taxMultiplier * tipMultiplier;
  }

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

  const handleSaveClick = () => {
    return (ev) => { 
      setIsEditing(false); 
      ev.stopPropagation();
    }
  }
  
  const handleCancelClick = () => {
    return (ev) => { 
      setIsEditing(false);
      setUpdatedActivity({...initialActivity});
      ev.stopPropagation();
    }
  }

  const handleNameChange = () => {
    return (ev) => {
      setUpdatedActivity({...updatedActivity, hasChanges:true, name: ev.target.value});
    }
  }

  if(!updatedActivity) {
    return <LinearProgress/>
  }

  return (
    <Accordion expanded={expanded} onChange={handleAccordionChange()}>      
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        sx={{my: 0}}
        style={{display: 'flex', margin: 0}}>

          <Box style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box style={{flex: 1}}>
              {isEditing ? (
                <TextField style={{flex: 1}} defaultValue={updatedActivity.name} variant='standard' onChange={handleNameChange()}/>
              )
            : (
              <Typography style={{textOverflow: 'ellipsis', whiteSpace: 'no-wrap', overflow: 'hidden'}}>
                {updatedActivity.name}
              </Typography>
            )}
              
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
                    onClick={handleSaveClick()}>
                    <CheckIcon/>
                  </IconButton>
                  <IconButton sx={{p: 0.25, mx: 1}} onClick={handleCancelClick()}>
                    <CloseIcon/>
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

        <Typography>
          {updatedActivity.description}
        </Typography>
      
        <List>
          <ListItem>
            {moment(updatedActivity.start).toISOString()}
          </ListItem>
        </List>
        <Divider />

        <Typography variant="subtitle1" gutterBottom style={{ marginTop: '15px' }}>
          Expenses
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Unit Cost</StyledTableCell>
              <StyledTableCell>No. of Units</StyledTableCell>
              <StyledTableCell>Tax</StyledTableCell>
              <StyledTableCell>Tip</StyledTableCell>
              <StyledTableCell>Cost</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense, idx) => (
              <TableRow key={idx}>
                <StyledTableCell>{expense.description}</StyledTableCell>
                <StyledTableCell>{expense.unitCost}</StyledTableCell>
                <StyledTableCell>{expense.units}</StyledTableCell>
                <StyledTableCell><Checkbox sx={{p: 0}} checked={expense.hasTax} disabled /></StyledTableCell>
                <StyledTableCell><Checkbox sx={{p: 0}} checked={expense.hasTip} disabled /></StyledTableCell>
                <StyledTableCell>{calculateExpense(expense)}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  )
}