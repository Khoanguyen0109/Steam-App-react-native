import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LiveStream from './LiveStream';
import CreateLiveStream from './CreateLiveStream';

const Stack = createStackNavigator();

function DiscoverStackScreen() {
  return (
    <Stack.Navigator initialRouteName='CreateLiveStream'>
      <Stack.Screen
        name='CreateLiveStream'
        options={{ headerShown: false }}
        component={CreateLiveStream}
      />
      <Stack.Screen
        name='LiveStream'
        options={{ headerShown: false }}
        component={LiveStream}
      />
      {/* <Stack.Screen
        name='Location'
        options={{ headerShown: false }}
        component={}
      /> */}
    </Stack.Navigator>
  );
}

export default DiscoverStackScreen;
