// App.js
import { StatusBar, LogBox } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import Toast from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';

// Optional: Ignore specific warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <RootNavigator />
      </PersistGate>
    </Provider>
     <Toast />
     
    </>
  );
};

export default App;