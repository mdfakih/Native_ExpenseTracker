import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import IconButton from './components/UI/IconButton';
import ExpenseContextProvider from './store/expenses-context';

export default function App() {
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();

  const ExpensesOverview = () => {
    return (
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          headerTintColor: 'white',
          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate('MangeExpense');
              }}
            />
          ),
        })}
      >
        <BottomTabs.Screen
          name="RecentExpense"
          component={RecentExpenses}
          options={{
            title: 'Recent Expenses',
            tabBarLabel: 'Recent',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="hourglass"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <BottomTabs.Screen
          name="AllExpenses"
          component={AllExpenses}
          options={{
            title: 'All Expenses',
            tabBarLabel: 'All Expenses',
            tabBarIcon: ({ size, color }) => (
              <Ionicons
                name="calendar"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </BottomTabs.Navigator>
    );
  };

  return (
    <>
      <StatusBar style="light" />
      {/* <Provider store={store}> */}
      <ExpenseContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ExpensesOverview"
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MangeExpense"
              component={ManageExpense}
              options={{
                presentation: 'modal',
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>
      {/* </Provider> */}
    </>
  );
}
