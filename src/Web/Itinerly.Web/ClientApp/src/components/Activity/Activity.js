import React, { Fragment, useState } from 'react';
import { 
  Accordion, AccordionDetails, AccordionSummary, Box, Divider, List, ListItem, 
  Table, TableBody, TableCell, TableHead, TableRow, Typography, Checkbox, IconButton, 
}from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelectedProject } from '../../contexts/SelectedProjectContext';
import moment from 'moment';

const StyledTableCell = (props) => {
  return (<TableCell sx={{py: 1}} {...props}>{props.children}</TableCell>);
}

export const Activity = ({ activity, expenses }) => {
  const { locations } = useSelectedProject();
  const [ expanded, setExpanded ] = useState(false);

  const calculateExpense = (expense) => {
    const location = locations.filter(l => l.id === activity.locationId)[0];

    const baseCost = expense.unitCost * expense.units;
    const taxMultiplier = (1 + (expense.hasTax ? (location.tax / 100.0) : 0));
    const tipMultiplier = (1 + (expense.hasTip ? (location.tip / 100.0) : 0));

    return baseCost * taxMultiplier * tipMultiplier;
  }

  const handleAccordionChange = () => {
    return (ev) => {
      ev.preventDefault();
      if(!expanded) setExpanded(true);
    }
  }
  
  const handleExpandClick = () => {
    return (ev) => { ev.stopPropagation(); }
  }

  const handleEditClick = () => {
    return (ev) => { ev.stopPropagation(); }
  }
  
  const handleCloseClick = () => {
    return () => { if(expanded) setExpanded(false); }
  }


  return (
    <Accordion expanded={expanded} onChange={handleAccordionChange()}>      
      <AccordionSummary
        sx={{mY: 0}}
        style={{display: 'flex'}}>

          <Box style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box style={{flex: 1}}>
              <Typography style={{textOverflow: 'ellipsis', whiteSpace: 'no-wrap', overflow: 'hidden'}}>
                {activity.name}
              </Typography>
            </Box>
          </Box>

          {expanded && (
            <Fragment>
              <IconButton onClick={handleEditClick()}>
                <EditIcon/>
              </IconButton>
              <IconButton>
                <MoreVertIcon/>
              </IconButton>
              <IconButton onClick={handleCloseClick()}>
                <CloseIcon/>
              </IconButton>
            </Fragment>
          )}
      </AccordionSummary>
    
      <AccordionDetails
        style={{ position: 'relative' }}>

        <Typography>
          {activity.description}
        </Typography>
      
        <List>
          <ListItem>
            {moment(activity.start).toISOString()}
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