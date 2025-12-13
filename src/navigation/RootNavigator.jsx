import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator'; // Private screens
import PublicNavigator from './PublicNavigator';
import { useSelector } from 'react-redux';


export default function RootNavigator() {
  const token = useSelector((state) => state.auth.accessToken);
  return (
    <NavigationContainer>
      {token ? <AppNavigator /> : <PublicNavigator />}
    </NavigationContainer>
  );
}
