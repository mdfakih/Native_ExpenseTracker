import React from 'react';
import { FlatList, Text } from 'react-native';
import ExpenseItem from './ExpenseItem';

const ExpensesList = ({ expenses }) => {
  const renderExpenseItem = (itemData) => {
    return <ExpenseItem {...itemData.item} />;
  };

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
    />
  );
};

export default ExpensesList;
