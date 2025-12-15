import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import { useRegisterMutation } from '../../redux/api/authApi';
import { saveRefreshToken } from '../../context/secureStore';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

/* -------------------- SCREEN -------------------- */
export default function RegisterScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [register, { isLoading }] = useRegisterMutation();

  /* -------------------- SUBMIT -------------------- */
  const onSubmit = async data => {
    try {
      const res = await register(data).unwrap();
      // save refresh token securely
      if (res?.data?.refreshToken) {
        await saveRefreshToken(res?.data?.refreshToken);
      }
      // redux login
      dispatch(
        loginSuccess({
          user: res?.data?.user,
          accessToken: res?.data?.accessToken,
        }),
      );
      Toast.show({
        type: 'success',
        text1: 'Registration successful',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1:
          error?.data?.message ||
          error?.error ||
          'Registration failed',
      });
    }
  };
  /* -------------------- UI -------------------- */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* NAME */}
      <Text style={styles.label}>Name</Text>
      <Controller
        control={control}
        name="name"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      {/* EMAIL */}
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && (
        <Text style={styles.error}>{errors.email.message}</Text>
      )}

      {/* PASSWORD */}
      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
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

      {/* SUBMIT */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      {/* REDIRECT */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.redirect}>
          Already have an account?{' '}
          <Text style={styles.redirectLink}>Login</Text>
        </Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
}

/* -------------------- STYLES -------------------- */
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
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  redirect: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
  redirectLink: {
    color: '#2E86DE',
    fontWeight: '600',
  },
});
