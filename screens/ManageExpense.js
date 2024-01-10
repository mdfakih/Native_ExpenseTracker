import React, { useContext, useLayoutEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import Button from '../components/UI/Button';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpense = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const handleModal = () => setModalVisible(!modalVisible);

  const expenseCtx = useContext(ExpensesContext);

  const editExpenseId = route.params?.expenseId;
  const isEditing = !!editExpenseId;

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editExpenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deletExpenseHandler = async () => {
    setIsLoading(true);
    try {
      expenseCtx.deleteExpense(editExpenseId);
      await deleteExpense(editExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not fetch expenses!');
      setIsLoading(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        expenseCtx.updateExpense(editExpenseId, expenseData);
        await updateExpense(editExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({ ...expenseData, id: id });
      }
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      setError('Could not save Data- please try again');
      setIsLoading(false);
    }
  };

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValues={selectedExpense}
        submitBtnLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
      />

      {isEditing && (
        <View style={styles.deleteConatiner}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={handleModal}
            // onPress={deletExpenseHandler}
          />
        </View>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this Expense?
            </Text>
            <View style={styles.btnContainer}>
              <Button
                style={styles.btns}
                onPress={handleModal}
              >
                NO
              </Button>
              <Button
                style={styles.btns}
                onPress={deletExpenseHandler}
                mode="flat"
              >
                YES
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteConatiner: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    // backgroundColor: 'transparent',
  },
  modalInnerContainer: {
    backgroundColor: GlobalStyles.colors.gray700,
    borderRadius: 4,
    marginHorizontal: 12,
    marginVertical: 24,
    padding: 8,
  },
  modalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 24,
    marginHorizontal: 12,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btns: {
    flex: 1,
    margin: 4,
    padding: 2,
  },
});

export default ManageExpense;
