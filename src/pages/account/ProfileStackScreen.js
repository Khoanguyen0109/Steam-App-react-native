import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Name from './Name';
import Gender from './Gender';
import Profile from './Profile';
import Email from './Email';


const Stack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Profile'
        component={Profile}
      />
        <Stack.Screen
        name='Name'
        component={Name}
      />
        <Stack.Screen
        name='Gender'
        component={Gender}
      />
      <Stack.Screen
        name='Email'
        component={Email}
      />
    </Stack.Navigator>
  );
}

export default ProfileStackScreen;
