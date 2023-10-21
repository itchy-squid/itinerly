import { isEqual, keys, pick } from 'lodash';

export const emptyExpense = {
  description: '',
  unitCost: '',
  units: '',
  hasTax: false,
  hasTip: false
}

export const isEmptyExpense = (expense) => 
{
  return isEqual(pick(expense, keys(emptyExpense)), emptyExpense);
}
