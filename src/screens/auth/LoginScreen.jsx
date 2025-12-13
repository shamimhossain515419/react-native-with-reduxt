import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { saveRefreshToken } from '../../context/secureStore';

// Validation schema
const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = () => {
  const dispatch = useDispatch();
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
      const newData = {
        user: { email: data?.email, name: 'Md Shamim Hossain' },
        token:"DDLdfdfgdDDFdfDdfdDd343dfdgdfDDFgdddfdfDFd"
      };
      dispatch(loginSuccess(newData));

       await saveRefreshToken(newData?.token)
       Toast.show({
        type: 'success',
        text1: "Login Successfully",
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* EMAIL */}
      <Text style={styles.label}>Email</Text>
      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={value}
            autoCapitalize="none"
            onChangeText={onChange}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* PASSWORD */}
      <Text style={styles.label}>Password</Text>
      <Controller
        name="password"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {/* BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/* Redirect Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.redirect}>
          Don't have an account?{' '}
          <Text style={styles.redirectLink}>Register</Text>
        </Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#fff',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  redirect: { textAlign: 'center', marginTop: 15, fontSize: 14 },
  redirectLink: { color: '#2E86DE', fontWeight: '600' },
});
