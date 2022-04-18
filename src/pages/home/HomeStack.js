import React from 'react';
import Home from './Home';
import { createStackNavigator } from '@react-navigation/stack';

import Category from '../category/Category';
import ProductDetail from '../product/ProductDetail';
import MoreCategory from '../category/MoreCategory';
import ShopProductStackScreen from '../shopProduct/ShopProductStackScreen';

const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen
        name='HomeScreen'
        component={Home}
        // component={ShopProductStackScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Category'
        options={({ route }) => ({ title: route.params.name })}
        component={Category}
      />
      <Stack.Screen
        name='MoreCategory'
        options={{ title: 'More Category' }}
        component={MoreCategory}
      />
      <Stack.Screen
        name='ProductDetail'
        options={({ route }) => ({ title: route.params.name })}
        component={ProductDetail}
      />
    </Stack.Navigator>
  );
}

export default HomeStackScreen;
