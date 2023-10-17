import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox, } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { EditableCheckbox, EditableText } from '../../components/editable';
import { useSelectedProject } from '../../contexts/SelectedProjectContext';

const StyledTableCell = (props) => {
  return (<TableCell sx={{py: 0.5}} {...props}>{props.children}</TableCell>);
}

export const Expenses = ({location, expenses, isEditing, onChange}) => {
  const [ hasUpdates, setHasUpdates ] = useState(false);

  const calculateExpense = (expense) => {
    const baseCost = expense.unitCost * expense.units;
    const taxMultiplier = (1 + (expense.hasTax ? (location.tax / 100.0) : 0));
    const tipMultiplier = (1 + (expense.hasTip ? (location.tip / 100.0) : 0));

    return baseCost * taxMultiplier * tipMultiplier;
  }
  
  const handlePropertyChange = (expense) => {
    return (ev) => 
    {
      const { name, value } = ev.target;
      console.log("id: " + expense.id + " name: " + name + " value: " + value);
      onChange([expenses.map(e => e.id != expense.id ? e : {...expense, [name]: [value]})]);
    }
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
              <EditableText name="description" 
                isEditing={isEditing} 
                value={expense.description}
                onChange={handlePropertyChange(expense)}/>
            </StyledTableCell>
            <StyledTableCell>
              <EditableText name="unitCost"
                isEditing={isEditing} 
                value={expense.unitCost}
                onChange={handlePropertyChange(expense)}/>
            </StyledTableCell>
            <StyledTableCell>
              <EditableText name="units"
                isEditing={isEditing} 
                value={expense.units}
                onChange={handlePropertyChange(expense)}/>
            </StyledTableCell>
            <StyledTableCell>
              <EditableCheckbox name="hasTax"
                isEditing={isEditing} 
                checked={expense.hasTax}/>
            </StyledTableCell>
            <StyledTableCell>
              <EditableCheckbox name="hasTip"
                isEditing={isEditing} 
                checked={expense.hasTip}/>
            </StyledTableCell>
            <StyledTableCell>{calculateExpense(expense)}</StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}