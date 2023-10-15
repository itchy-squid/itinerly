import React from 'react';
import { 
  Accordion, AccordionSummary, AccordionDetails, Container, Divider, 
  Fab, LinearProgress, List, ListItem, Table, TableBody, 
  TableCell, TableHead, TableRow, Typography, Checkbox, 
}from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelectedProject } from '../../contexts/SelectedProjectContext';
import moment from 'moment';
import { toast } from 'react-toastify';

export const ProjectView = () => {
  const {project, activities, expenses, loading, error} = useSelectedProject();

  if(loading) {
    return <LinearProgress/>
  }

  if(error){
    toast.error(error);
    return <></>
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {project.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {project.description}
      </Typography>

      {activities.map((activity, index) => (
        <Activity 
          key={index} 
          project={project}
          activity={activity} 
          expenses={expenses.filter(e => e.activityId == activity.id)} />
      ))}

      <Fab 
        color="primary" 
        aria-label="add" 
        sx={{ m: 4 }}
        style={{ position: 'fixed', bottom: 0, right: 0 }} >
        <AddIcon />
      </Fab>
    </Container>
  );
}

const StyledTableCell = (props) => {
  return (<TableCell sx={{py: 1}} {...props}>{props.children}</TableCell>);
}

export const Activity = ({ activity, expenses }) => {
  const { locations } = useSelectedProject();

  const calculateExpense = (expense) => {
    const location = locations.filter(l => l.id === activity.locationId)[0];

    const baseCost = expense.unitCost * expense.units;
    const taxMultiplier = (1 + (expense.hasTax ? (location.tax / 100.0) : 0));
    const tipMultiplier = (1 + (expense.hasTip ? (location.tip / 100.0) : 0));

    return baseCost * taxMultiplier * tipMultiplier;
  }

  return (
    <Accordion>
      
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}>

        <Typography>
          {activity.name}
        </Typography>
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