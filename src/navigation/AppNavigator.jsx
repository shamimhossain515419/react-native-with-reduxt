import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/private/HomeScreen';
import SettingsScreen from '../screens/private/SettingsScreen';
import ExpenseScreen from '../screens/private/ExpenseScreen';
import AddExpenseScreen from '../screens/private/AddExpenseScreen';
import NativeSelectorScreen from '../screens/private/NativeSelectorScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Expense" component={ExpenseScreen} />
      <Stack.Screen name="NativeSelector" component={NativeSelectorScreen} />
      <Stack.Screen
        name="AddExpense"
        screenOptions={{ headerTitle: 'Add New Expense' }}
        component={AddExpenseScreen}
      />
    </Stack.Navigator>
  );
}
