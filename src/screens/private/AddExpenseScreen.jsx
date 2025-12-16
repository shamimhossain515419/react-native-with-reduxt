import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';
import * as Yup from 'yup';
import { inputStyleSheet } from '../../styles/InputStyleSheet';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { useGetAllExpenseCategoryQuery } from '../../redux/api/expenseCategoryApi';
import Toast from 'react-native-toast-message';
import { useCreateExpenseMutation } from '../../redux/api/expenseApi';
const schema = Yup.object().shape({
  category: Yup.string().required('Category is required'),
  amount: Yup.number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required'),
  note: Yup.string().max(255, 'Note cannot exceed 255 characters'),
  expense_date: Yup.date().required('Expense date is required'),
  payment_method: Yup.string()
    .oneOf(['cash', 'bank', 'card', 'mobile_banking'])
    .required('Payment method is required'),
});

const AddExpenseScreen = () => {
  const [isFocused, setIsFocused] = useState({});
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: categories, error } = useGetAllExpenseCategoryQuery();
  const [createExpense, { isLoading }] = useCreateExpenseMutation();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async data => {
    try {
      const res = await createExpense(data).unwrap();
       Toast.show({
        type: 'success',
        text1: 'Expense added successfully',
      });
      navigation.goBack();
    } catch (error) {
     Toast.show({
        type: 'error',
        text1: error?.data?.message || error?.error || 'Failed to add expense',
      });
    }
  };
  // Category dropdown items
  const categoryItems =
    categories?.data?.map(cat => ({
      label: cat.name,
      value: cat._id,
    })) || [];
  console.log(categoryItems, 'categoryItems');
  // Payment method options
  const paymentMethods = [
    { label: 'Cash', value: 'cash' },
    { label: 'Bank', value: 'bank' },
    { label: 'Card', value: 'card' },
    { label: 'Mobile Banking', value: 'mobile_banking' },
  ];

  const CustomSelector = ({ items, value, onChange, placeholder, modalVisible, setModalVisible }) => {
    const selectedItem = items.find(item => item.value === value);
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
          style={[
            inputStyleSheet.input,
            { justifyContent: 'center' },
          ]}
        >
          <Text style={{ color: value ? '#000' : '#999' }}>
            {selectedItem ? selectedItem.label : placeholder}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select {placeholder}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={items}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.modalItem,
                      value === item.value && styles.modalItemSelected,
                    ]}
                    onPress={() => {
                      onChange(item.value);
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalItemText,
                        value === item.value && styles.modalItemTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleHeder}>Add Expense</Text>
        {/* Category Selector */}
      <View style={inputStyleSheet.fieldContainer}>
        <Text style={inputStyleSheet.label}>Category *</Text>
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <CustomSelector
              items={categoryItems}
              value={value}
              onChange={onChange}
              placeholder="Select category"
              modalVisible={categoryModalVisible}
              setModalVisible={setCategoryModalVisible}
            />
          )}
        />
        {errors?.category && (
          <Text style={inputStyleSheet.error}>{errors.category.message}</Text>
        )}
      </View>

      {/* Amount Input */}
      <View style={inputStyleSheet.fieldContainer}>
        <Text style={inputStyleSheet.label}>Amount *</Text>
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                inputStyleSheet.input,
                isFocused.amount && inputStyleSheet.inputFocused,
                errors?.amount && inputStyleSheet.inputError,
              ]}
              placeholder="Enter amount"
              placeholderTextColor="#999"
              value={value}
              onChangeText={onChange}
              onFocus={() => setIsFocused({ ...isFocused, amount: true })}
              onBlur={() => setIsFocused({ ...isFocused, amount: false })}
              keyboardType="numeric"
            />
          )}
        />
        {errors?.amount && (
          <Text style={inputStyleSheet.error}>{errors.amount.message}</Text>
        )}
      </View>
      
      {/* Payment Method Selector */}
      <View style={inputStyleSheet.fieldContainer}>
        <Text style={inputStyleSheet.label}>Payment Method *</Text>
        <Controller
          control={control}
          name="payment_method"
          render={({ field: { onChange, value } }) => (
            <CustomSelector
              items={paymentMethods}
              value={value}
              onChange={onChange}
              placeholder="Select payment method"
              modalVisible={paymentModalVisible}
              setModalVisible={setPaymentModalVisible}
            />
          )}
        />
        {errors?.payment_method && (
          <Text style={inputStyleSheet.error}>{errors.payment_method.message}</Text>
        )}
      </View>

      {/* Note Input */}
      <View style={styles.fieldContainer}>
        <Text style={inputStyleSheet.label}>Note</Text>
        <Controller
          control={control}
          name="note"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                inputStyleSheet.input,
                inputStyleSheet.noteInput,
                isFocused.note && inputStyleSheet.inputFocused,
                errors?.note && inputStyleSheet.inputError,
              ]}
              placeholder="Add a note (optional)"
              placeholderTextColor="#999"
              value={value}
              onChangeText={onChange}
              onFocus={() => setIsFocused({ ...isFocused, note: true })}
              onBlur={() => setIsFocused({ ...isFocused, note: false })}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          )}
        />
        {errors?.note && (
          <Text style={inputStyleSheet.error}>{errors.note.message}</Text>
        )}
      </View>

      {/* Expense Date Input */}
      <View style={styles.fieldContainer}>
        <Text style={inputStyleSheet.label}>Expense Date *</Text>

        <Controller
          control={control}
          name="expense_date"
          render={({ field: { onChange, value } }) => (
            <>
              {/* Fake Input */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setOpen(true)}
                style={[
                  inputStyleSheet.input,
                  isFocused.expense_date && inputStyleSheet.inputFocused,
                  errors?.expense_date && inputStyleSheet.inputError,
                  { justifyContent: 'center' },
                ]}
              >
                <Text style={{ color: value ? '#000' : '#999' }}>
                  {value || 'YYYY-MM-DD'}
                </Text>
              </TouchableOpacity>

              {/* Date Picker Modal */}
              <DatePicker
                modal
                open={open}
                date={value ? new Date(value) : new Date()}
                mode="date"
                onConfirm={date => {
                  setOpen(false);

                  // format YYYY-MM-DD
                  const formattedDate = date.toISOString().split('T')[0];
                  onChange(formattedDate);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          )}
        />

        {errors?.expense_date && (
          <Text style={inputStyleSheet.error}>
            {errors.expense_date.message}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={inputStyleSheet.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={inputStyleSheet.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  titleHeder: {
    fontSize: 20,
    fontWeight: 500,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 5,
  },
  error: {
    color: 'red',
    marginTop: 3,
  },
  button: {
    backgroundColor: '#2E86DE',
    padding: 15,
    marginTop: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
   // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
    fontWeight: '300',
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalItemSelected: {
    backgroundColor: '#E8F4FD',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalItemTextSelected: {
    color: '#2E86DE',
    fontWeight: '600',
  },
});
