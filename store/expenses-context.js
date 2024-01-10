import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: ({ id }) => {},
  updateExpense: ({ id, description, amount, date }) => {},
});

// const DUMMY_EXPENSES = [
//   {
//     id: 'e1',
//     description: 'Pair of shoes',
//     amount: 59.99,
//     date: new Date('2024-01-07'),
//   },
//   {
//     id: 'e2',
//     description: 'Pair of trouesers',
//     amount: 89.29,
//     date: new Date('2023-11-07'),
//   },
//   {
//     id: 'e3',
//     description: 'Bananas',
//     amount: 19.29,
//     date: new Date('2024-01-02'),
//   },
//   {
//     id: 'e4',
//     description: 'Book',
//     amount: 14.99,
//     date: new Date('2023-12-23'),
//   },
//   {
//     id: 'e5',
//     description: 'Another Book',
//     amount: 19.59,
//     date: new Date('2024-01-05'),
//   },
//   {
//     id: 'e6',
//     description: 'Pair of trouesers',
//     amount: 89.29,
//     date: new Date('2023-11-07'),
//   },
//   {
//     id: 'e7',
//     description: 'Bananas',
//     amount: 19.29,
//     date: new Date('2024-01-02'),
//   },
//   {
//     id: 'e8',
//     description: 'Book',
//     amount: 141.99,
//     date: new Date('2023-12-23'),
//   },
//   {
//     id: 'e9',
//     description: 'Another Book',
//     amount: 19.59,
//     date: new Date('2024-01-05'),
//   },
//   {
//     id: 'e10',
//     description: 'Another Book',
//     amount: 19.69,
//     date: new Date('2024-01-05'),
//   },
// ];

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // const id = new Date().toString() + Math.random().toString();
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      const updateableExpense = state[updateableExpenseIndex];
      const updatedItem = { ...updateableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const ExpenseContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: 'SET', payload: expenses });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpenseContextProvider;
