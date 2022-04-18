import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './Cart';
import AddressScreen from '../address/AddressScreen';
import { Icon, IconButton } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';;
import { useNavigation ,useRoute } from '@react-navigation/native';
import CreateAddress from '../address/CreateAddress';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

function CartStackScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const tabHiddenRoutes = ["ShipTo","CreateAddress"];
  if(tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))){
    navigation.setOptions({tabBarStyle: {display: 'none'}});
   } else {
   navigation.setOptions({tabBarStyle: {display: 'flex'}});
  }
  return (
    <Stack.Navigator initialRouteName='Cart'>
      <Stack.Screen
        name='Cart'
        component={Cart}
        options={{ title: 'Your cart' }}
      />
      <Stack.Screen
        name='ShipTo'
        options={{
          title: 'Ship To',
          headerRight: () => (
            <IconButton
              onPress={() => navigation.navigate('CreateAddress')}
              icon={
                <Icon
                  as={<MaterialIcons name='add' />}
                  size={7}
                  color='cyan.700'
                />
              }
            />
          ),
        }}
        component={AddressScreen}
      />
      <Stack.Screen
        name='CreateAddress'
        options={{
          title: 'Add Address',
        }}
        component={CreateAddress}
      />
    </Stack.Navigator>
  );
}

export default CartStackScreen;
