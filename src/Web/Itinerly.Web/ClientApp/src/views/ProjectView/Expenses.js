import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox, } from '@mui/material';
import { EditableCheckbox, EditableText } from '../../components/editable';
import { clone } from 'lodash';

const StyledTableCell = (props) => {
  return (<TableCell sx={{py: 0.5}} {...props}>{props.children}</TableCell>);
}

const emptyExpense = {
  description: '',
  unitCost: '',
  units: '',
  hasTax: false,
  hasTip: false
}

const columns = [
  { name: 'description', header: 'Description', defaultFlex: 1, minWidth: 250 },
  { name: 'unitCost', header: 'Unit Cost', defaultFlex: 1, minWidth: 50 },
  { name: 'units', header: 'No. of Units', defaultFlex: 1, minWidth: 50}
];

export const Expenses = ({location, expenses, isEditing, onChange}) => {
  const [ newExpense, setNewExpense ] = useState(emptyExpense);

  const calculateExpense = (expense) => {
    const baseCost = expense.unitCost * expense.units;
    const taxMultiplier = (1 + (expense.hasTax ? (location.tax / 100.0) : 0));
    const tipMultiplier = (1 + (expense.hasTip ? (location.tip / 100.0) : 0));

    return baseCost * taxMultiplier * tipMultiplier;
  }
  
  const handleTextPropertyChange = (expense, idx) => 
  {
    return (ev) => 
    {
      const { name, value } = ev.target;
      const updatedExpense = {...expense, [name]: [value]};

      if(idx >= expenses.length)
      {
        onChange([...expenses, updatedExpense]);
      }
      else{
        const updatedExpenses = clone(expenses);
        updatedExpenses[idx] = updatedExpense;
        onChange(updatedExpenses);
      }
    }
  }

  // const handleNewExpenseTextPropertyChange = (ev) => 
  // {
  //   const { name, value } = ev.target;
  //   setNewExpense({...newExpense, [name]: [value]});
  // }
  
  // const handleNewExpenseTextPropertyBlur = (ev) => 
  // {
  //   const { name, value } = ev.target;
  //   onChange([...expenses, newExpense]);
  //   setNewExpense(emptyExpense);
  // }
  
  const handleCheckboxPropertyChange = (expense) => 
  {
    return (ev) => 
    {
      const { name, checked } = ev.target;
      onChange(expenses.map(e => e.id != expense.id ? e : {...expense, [name]: checked}));
    }
  }

  const style = {
    minHeight: '500px',
    minWidth: '500px'
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
        {expenses && (isEditing ? [...expenses, newExpense] : expenses).map((expense, idx) => (
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
              <EditableCheckbox name="hasTax"
                isEditing={isEditing} 
                checked={expense.hasTax}
                onChange={handleCheckboxPropertyChange(expense)}/>
            </StyledTableCell>
            <StyledTableCell>
              <EditableCheckbox name="hasTip"
                isEditing={isEditing} 
                checked={expense.hasTip}
                onChange={handleCheckboxPropertyChange(expense)}/>
            </StyledTableCell>
            <StyledTableCell>{calculateExpense(expense)}</StyledTableCell>
          </TableRow>
        ))}
        {/* {isEditing && (
          <TableRow>
              <StyledTableCell>
                <EditableText name="description" 
                  isEditing={isEditing} 
                  value={newExpense.description}
                  onChange={handleNewExpenseTextPropertyChange}
                  onBlur={handleNewExpenseTextPropertyBlur}/>
              </StyledTableCell>
              <StyledTableCell>
                <EditableText name="unitCost"
                  isEditing={isEditing} 
                  value={newExpense.unitCost}
                  onChange={handleNewExpenseTextPropertyChange}
                  onBlur={handleNewExpenseTextPropertyBlur}/>
              </StyledTableCell>
              <StyledTableCell>
                <EditableText name="units"
                  isEditing={isEditing} 
                  value={newExpense.units}
                  onChange={handleNewExpenseTextPropertyChange}
                  onBlur={handleNewExpenseTextPropertyBlur}/>
              </StyledTableCell>
              <StyledTableCell>
                <EditableCheckbox name="hasTax"
                  isEditing={isEditing} />
              </StyledTableCell>
              <StyledTableCell>
                <EditableCheckbox name="hasTip"
                  isEditing={isEditing} />
              </StyledTableCell>
          </TableRow>
        )} */}
      </TableBody>
    </Table>
  );
}