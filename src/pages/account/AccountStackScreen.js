import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from './Account';
import Profile from './Profile';
import OrderStackScreen from '../order/OrderStackScreen';
import ProfileStackScreen from './ProfileStackScreen';
import AddressStackScreen from '../address/AddressStackScreen';

const Stack = createStackNavigator();

function AccountStackScreen() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Account' component={Account} />
      <Stack.Screen
        name='Profile'
        options={{ headerShown: false }}
        component={ProfileStackScreen}
      />
      <Stack.Screen
        name='Order'
        options={{ headerShown: false }}
        component={OrderStackScreen}
      />
      <Stack.Screen
        name='Location'
        options={{ headerShown: false }}
        component={AddressStackScreen}
      />
    </Stack.Navigator>
  );
}

export default AccountStackScreen;
