import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';

import OrderScreen from './OrderScreen';
import OrderDetail from './OrderDetail';

const Stack = createStackNavigator();

function OrderStackScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const tabHiddenRoutes = ["OrderDetail","Order"];
  if(tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))){
    navigation.setOptions({tabBarStyle: {display: 'none'}});
   } else {
   navigation.setOptions({tabBarStyle: {display: 'flex'}});
  }
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Order' component={OrderScreen} />
      <Stack.Screen name='OrderDetail' component={OrderDetail} />
    </Stack.Navigator>
  );
}

export default OrderStackScreen;
