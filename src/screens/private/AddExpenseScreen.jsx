import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';
import { inputStyleSheet } from '../../styles/InputStyleSheet';
import { useState } from 'react';
const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const AddExpenseScreen = () => {
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <View style={styles.container}>
      <Text style={styles.titleHeder}>Add Expense</Text>
      <View style={{marginTop:10}}>
         <Controller
        control={control}
        name="name"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              inputStyleSheet.input,
              isFocused && inputStyleSheet.inputFocused,
              errors?.name && inputStyleSheet.inputError,
            ]}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={value}
            onChangeText={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}
      />

      {errors?.name && (
        <Text style={inputStyleSheet.error}>
          {errors.name.message}
        </Text>
      )}
      </View>
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
});
