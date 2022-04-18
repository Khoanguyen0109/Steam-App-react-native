import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ShopAccount from './ShopAccount';
import AllProduct from '../shopProduct/AllProduct';
import CreateProduct from '../shopProduct/CreateProduct';
import ProfileStackScreen from '../account/ProfileStackScreen';
import OrderStackScreen from '../order/OrderStackScreen';
import Revenue from './Revenue';
import LiveStream from '../discover/LiveStream';
import DiscoverStackScreen from '../discover/DiscoverStack';

const Stack = createStackNavigator();

function ShopAccountStackScreen() {
  return (
    <Stack.Navigator initialRouteName='ShopAccount'>
      <Stack.Screen name='ShopAccount' component={ShopAccount} />
      <Stack.Screen name='LiveStream' component={DiscoverStackScreen} />

      <Stack.Screen name='AllProduct' component={AllProduct} />
      <Stack.Screen name='CreateProduct' component={CreateProduct} />
      <Stack.Screen
        name='ShopProfile'
        options={{ headerShown: false }}
        component={ProfileStackScreen}
      />
      <Stack.Screen
        name='Order'
        options={{ headerShown: false }}
        component={OrderStackScreen}
      />
      <Stack.Screen name='Revenue' component={Revenue} />
    </Stack.Navigator>
  );
}

export default ShopAccountStackScreen;
