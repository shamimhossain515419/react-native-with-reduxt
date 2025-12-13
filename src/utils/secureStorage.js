// src/utils/secureStorage.js
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const secureStorage = {
  // Token securely save (Keychain use korbe - encrypted)
  saveToken: async (token) => {
    try {
      await Keychain.setGenericPassword('userToken', token, {
        service: 'com.reactnativewithreduxt.auth',
      });
      return true;
    } catch (error) {
      console.error('Error saving token:', error);
      return false;
    }
  },

  // Token retrieve
  getToken: async () => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: 'com.reactnativewithreduxt.auth',
      });
      if (credentials) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Token delete
  deleteToken: async () => {
    try {
      await Keychain.resetGenericPassword({
        service: 'com.reactnativewithreduxt.auth',
      });
      return true;
    } catch (error) {
      console.error('Error deleting token:', error);
      return false;
    }
  },

  // User data save (AsyncStorage - non-sensitive data)
  saveUserData: async (userData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  },

  // User data retrieve
  getUserData: async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  // Clear all data
  clearAll: async () => {
    try {
      await secureStorage.deleteToken();
      await AsyncStorage.removeItem('userData');
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  },
};