import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox, } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { EditableCheckbox, EditableText } from '../../components/editable';

const StyledTableCell = (props) => {
  return (<TableCell sx={{py: 0.5}} {...props}>{props.children}</TableCell>);
}

export const Expenses = ({location, expenses, isEditing}) => {

  const calculateExpense = (expense) => {
    const baseCost = expense.unitCost * expense.units;
    const taxMultiplier = (1 + (expense.hasTax ? (location.tax / 100.0) : 0));
    const tipMultiplier = (1 + (expense.hasTip ? (location.tip / 100.0) : 0));

    return baseCost * taxMultiplier * tipMultiplier;
  }

  return (
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
        {expenses && expenses.map((expense, idx) => (
          <TableRow key={idx}>
            <StyledTableCell>
              <EditableText isEditing={isEditing} defaultValue={expense.description}/>
            </StyledTableCell>
            <StyledTableCell>
              <EditableText isEditing={isEditing} defaultValue={expense.unitCost}/>
            </StyledTableCell>
            <StyledTableCell>
              <EditableText isEditing={isEditing} defaultValue={expense.units}/>
            </StyledTableCell>
            <StyledTableCell>
              <EditableCheckbox isEditing={isEditing} checked={expense.hasTax}/>
            </StyledTableCell>
            <StyledTableCell>
              <EditableCheckbox isEditing={isEditing} checked={expense.hasTip}/>
            </StyledTableCell>
            <StyledTableCell>{calculateExpense(expense)}</StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}