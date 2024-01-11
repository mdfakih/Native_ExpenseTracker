import React, { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpenseOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpenses = () => {
  // const expenses = useSelector((state) => state.expense.expenses);
  const expensesCtx = useContext(ExpensesContext);

  // const [fetchedExp, setFetchedExp] = useState([]);

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
    };
    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }

  // const recentExpense = fetchedExp.filter((expense) => {
  const recentExpense = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpense}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered fot the last 7 days."
    />
  );
};

export default RecentExpenses;
