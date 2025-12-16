import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
 import { useGetAllExpenseQuery } from '../../redux/api/expenseApi';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const ExpenseScreen = () => {
  const { data, isLoading, isError } = useGetAllExpenseQuery();
  const navigation = useNavigation();
  const handleDeleteExpense= async()=>{
     try{
       
     }catch(error){

     }
  }

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
         {/* Header with total amount */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>All Expenses</Text>
          <Text style={styles.totalAmount}>Total: ৳ {10}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={()=>navigation.navigate("AddExpense")}
        >
          <Icon name="add-circle" size={30} color="#4F46E5" />
        </TouchableOpacity>
      </View>

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
              <View style={styles.cardLeft}>
                <Text style={styles.amount}>
                  ৳ {item.amount}
                </Text>
                <Text style={styles.category}>
                  {item.category?.name || 'Uncategorized'}
                </Text>
                {item.note && (
                  <Text style={styles.note} numberOfLines={1}>
                    {item.note}
                  </Text>
                )}
              </View>

              <View style={styles.cardRight}>
                <Text style={styles.date}>
                  {moment(item.expense_date).format("DD-MM-YYYY")}
                </Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.editButton}
                    // onPress={() => openEditModal(item)}
                  >
                    <Icon name="create-outline" size={18} color="#4F46E5" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteExpense(item._id)}
                  >
                    <Icon name="trash-outline" size={18} color="#DC2626" />
                  </TouchableOpacity>
                </View>
              </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
  },
  cardRight: {
    alignItems: 'flex-end',
  },

  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
  },
  category: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
    fontWeight: '500',
  },
  note: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
   actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#EEF2FF',
  },
  deleteButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#FEE2E2',
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

  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:'center',
    marginBottom:20
  }
});
