import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { useGetAllExpenseQuery } from '../../redux/api/expenseApi';

const ExpenseScreen = () => {
  const { data, isLoading, isError } = useGetAllExpenseQuery();
 console.log(data,'datadata')
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading expenses...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>
          Failed to load expenses
        </Text>
      </View>
    );
  }

  const expenses = data?.data || []; // api response অনুযায়ী adjust করো

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Expenses</Text>

      {expenses.length === 0 ? (
        <Text style={styles.emptyText}>
          No expenses found
        </Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.amount}>
                  ৳ {item.amount}
                </Text>
                <Text style={styles.category}>
                  {item.category?.name || 'Uncategorized'}
                </Text>
                {item.note && (
                  <Text style={styles.note}>
                    {item.note}
                  </Text>
                )}
              </View>

              <Text style={styles.date}>
                {new Date(item.expense_date).toDateString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ExpenseScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#dc2626',
  },
  category: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
  },
  note: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#6b7280',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
