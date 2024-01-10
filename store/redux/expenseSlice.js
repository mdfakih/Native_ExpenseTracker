import { createSlice } from '@reduxjs/toolkit';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Pair of shoes',
    amount: 59.99,
    date: new Date('2024-01-07'),
  },
  {
    id: 'e2',
    description: 'Pair of trouesers',
    amount: 89.29,
    date: new Date('2023-11-07'),
  },
  {
    id: 'e3',
    description: 'Bananas',
    amount: 19.29,
    date: new Date('2024-01-02'),
  },
];
const initialState = {
  expenses: DUMMY_EXPENSES,
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpenses: (state, action) => {
      const id = newDate().toSting() + Math.random().toString();
      state.expenses.push({ ...action.payload, id: id });
    },
    updateExpense: (state, action) => {
      state.find((expense) => {
        if (expense.id === action.payload.id) {
          return {
            ...expense,
            description: action.payload.description,
            date: action.payload.date,
            amount: action.payload.amount,
          };
        }
      });
    },
    deleteExpense: (state, action) => {
      state.expenses.filter((expense) => expense.id !== action.payload.id);
    },
  },
});

export const { addExpenses, updateExpense, deleteExpense } =
  expensesSlice.actions;

export default expensesSlice.reducer;
