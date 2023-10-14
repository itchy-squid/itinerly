import React from 'react';
import { 
  Container, Paper, Typography, List, ListItem, Divider, Table, TableBody, 
  TableCell, TableHead, TableRow, LinearProgress, Fab, IconButton, Box, useMediaQuery, Accordion, AccordionSummary, AccordionDetails 
}from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelectedProject } from '../../contexts/SelectedProjectContext';
import moment from 'moment';
import useFocusedId from '../../hooks/useFocusedId';

export const ProjectView = () => {
  const {project, activities, loading} = useSelectedProject();
  const {toggleFocus, isFocused} = useFocusedId();

  if(loading) {
    return <LinearProgress/>
  }

  const handleEditActivityClicked = (id) => {
    return (ev) => { ev.stopPropagation(); }
  }

  const handleActivityClicked = (id) => {
    return () => { toggleFocus(id); }
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
        <Accordion
          key={index} 
          elevation={3} 
          onClick={handleActivityClicked(activity.id)}>
          
          <AccordionSummary
            id={`activity${index}-header`}
            aria-controls={`activity${index}-content`}
            expandIcon={<ExpandMoreIcon/>}>

            <Typography>
              {activity.name}
            </Typography>
          </AccordionSummary>

          <AccordionDetails
            style={{ position: 'relative' }}>

            <Typography variant="body1">
              {activity.description}
            </Typography>
{/*             
            <IconButton
              sx={{p: 1, m: 1}}
              style={{ position: 'absolute', top: 0, right: 0 }}
              onClick={handleEditActivityClicked(activity.id)}
            >
              <EditIcon />
            </IconButton> */}
          
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
                  <TableCell>Item Name</TableCell>
                  <TableCell>Cost</TableCell>
                  <TableCell>Units Bought</TableCell>
                  <TableCell>Tax</TableCell>
                  <TableCell>Tip</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {activity.expenses.map((expense, eIndex) => ( */}
                  <TableRow>
                    <TableCell>expense.itemName</TableCell>
                    <TableCell>expense.itemCost</TableCell>
                    <TableCell>expense.unitsBought</TableCell>
                    <TableCell>expense.tax</TableCell>
                    <TableCell>expense.tip</TableCell>
                  </TableRow>
                {/* ))} */}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
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