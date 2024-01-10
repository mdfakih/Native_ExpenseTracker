import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import ExpensesOutput from '../components/ExpenseOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

const AllExpenses = () => {
  // const expenses = useSelector((state) => state.expense.expenses);
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
};

export default AllExpenses;
