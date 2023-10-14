import React from 'react';
import { 
  Container, Paper, Typography, List, ListItem, Divider, Table, TableBody, 
  TableCell, TableHead, TableRow, LinearProgress 
}from '@mui/material';
import { useSelectedProject } from '../../contexts/SelectedProjectContext';
import moment from 'moment';

export const ProjectView = () => {
  const {project, activities, loading} = useSelectedProject();

  if(loading) {
    return <LinearProgress/>
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
        <Paper elevation={3} style={{ marginBottom: '20px', padding: '15px' }} key={index}>
        <Typography variant="h6" gutterBottom>
          {activity.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
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

      </Paper>
      ))}
    </Container>
  );
}