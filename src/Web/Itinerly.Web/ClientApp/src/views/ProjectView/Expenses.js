import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { EditableCheckbox, EditableText } from '../../components/editable';
import { clone } from 'lodash';
import { emptyExpense, isEmptyExpense } from '../../utils/expenseUtils';

const StyledTableCell = (props) => {
  return (<TableCell sx={{py: 0.5}} {...props}>{props.children}</TableCell>);
}

const columns = [
  { name: 'description', header: 'Description', defaultFlex: 1, minWidth: 250 },
  { name: 'unitCost', header: 'Unit Cost', defaultFlex: 1, minWidth: 50 },
  { name: 'units', header: 'No. of Units', defaultFlex: 1, minWidth: 50}
];

export const Expenses = ({location, expenses, isEditing, onChange, onAdd}) => {

  const calculateExpense = (expense) => {
    const baseCost = expense.unitCost * expense.units;

    const taxMultiplier = (1 + (location && expense.hasTax ? (location.tax / 100.0) : 0));
    const tipMultiplier = (1 + (location && expense.hasTip ? (location.tip / 100.0) : 0));

    return (baseCost * taxMultiplier * tipMultiplier).toFixed(2);
  }
  
  const handleTextPropertyChange = (expense, idx) => 
  {
    return (ev) => 
    {
      const { name, value } = ev.target;
      handlePropertyChangeInner(expense, idx, name, value);
    }
  }

  const handleCheckboxPropertyChange = (expense, idx) => 
  {
    return (ev) => 
    {
      const { name, checked } = ev.target;
      handlePropertyChangeInner(expense, idx, name, checked);
    }
  }

  const handlePropertyChangeInner = (expense, idx, name, value) => 
  {
    let updatedExpense = {...expense, [name]: value};

    // add case
    if(idx >= expenses.length)
    {
      onAdd(updatedExpense);
      return;
    }
    
    // delete case
    if(isEmptyExpense(updatedExpense))
    {
      updatedExpense = {...updatedExpense, isDeleted: true}
      // fall through because we treat the delete case as any other update.
    }

    // update case
    const updatedExpenses = clone(expenses);
    updatedExpenses[idx] = updatedExpense;
    onChange(updatedExpenses);  
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
        {expenses && (isEditing ? [...expenses, emptyExpense] : expenses).map((expense, idx) => !expense.isDeleted && (
          <TableRow key={idx}>
            <StyledTableCell>
              <EditableText name="description" 
                isEditing={isEditing} 
                value={expense.description}
                onChange={handleTextPropertyChange(expense, idx)}/>
            </StyledTableCell>
            <StyledTableCell>
              <EditableText name="unitCost"
                isEditing={isEditing} 
                value={expense.unitCost}
                onChange={handleTextPropertyChange(expense, idx)}/>
            </StyledTableCell>
            <StyledTableCell>
              <EditableText name="units"
                isEditing={isEditing} 
                value={expense.units}
                onChange={handleTextPropertyChange(expense, idx)}/>
            </StyledTableCell>
            <StyledTableCell>
              {location && (
                <EditableCheckbox name="hasTax"
                  isEditing={isEditing} 
                  checked={expense.hasTax}
                  onChange={handleCheckboxPropertyChange(expense, idx)}/>
              )}
            </StyledTableCell>
            <StyledTableCell>
              {location && (
                <EditableCheckbox name="hasTip"
                  isEditing={isEditing} 
                  checked={expense.hasTip}
                  onChange={handleCheckboxPropertyChange(expense, idx)}/>
              )}
            </StyledTableCell>
            <StyledTableCell>{calculateExpense(expense)}</StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}