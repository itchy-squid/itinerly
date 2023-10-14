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
        <Activity key={index} activity={activity} expenses={expenses} project={project}/>
      ))}

      <Accordion>
        <AccordionSummary IconButton={<AddIcon/>}>
          <AddIcon/>
          <Typography>
            Activity
          </Typography>
        </AccordionSummary>
      </Accordion>

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

export const Activity = ({ project, activity, expenses, key }) => {
  
  const calculateExpense = (project, expense) => {
    return expense.unitCost * expense.units * (1 + (expense.hasTax ? project.tax : 0)) * (1 + (expense.hasTip ? project.tip : 0));
  }

  return (
    <Accordion
      key={key}>
      
      <AccordionSummary
        id={`${key}-header`}
        aria-controls={`${key}-content`}
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
              <TableCell>Description</TableCell>
              <TableCell>Unit Cost</TableCell>
              <TableCell>No. of Units</TableCell>
              <TableCell>Tax</TableCell>
              <TableCell>Tip</TableCell>
              <TableCell>Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense, idx) => (
              <TableRow>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.unitCost}</TableCell>
                <TableCell>{expense.units}</TableCell>
                <TableCell><Checkbox sx={{p: 0}} checked={expense.hasTax} disabled /></TableCell>
                <TableCell><Checkbox sx={{p: 0}} checked={expense.hasTip} disabled /></TableCell>
                <TableCell>{calculateExpense(project, expense)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  )
}