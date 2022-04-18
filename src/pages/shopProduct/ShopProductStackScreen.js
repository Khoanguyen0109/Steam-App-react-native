import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';;
import AllProduct from './AllProduct';
import CreateProduct from './CreateProduct';

const Stack = createStackNavigator();

function ShopProductStackScreen() {
  const navigation = useNavigation()
  return (
    <Stack.Navigator initialRouteName='AllProduct'>
      <Stack.Screen
        name='AllProduct'
        options={{
          title: 'All Products',
          headerRight: () => (
            <IconButton
              onPress={() => navigation.navigate('CreateProduct')}
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
        component={AllProduct}
      />
      <Stack.Screen
        name='CreateProduct'
        // options={{ headerShown: false }}
        component={CreateProduct}
      />
    </Stack.Navigator>
  );
}

export default ShopProductStackScreen;
