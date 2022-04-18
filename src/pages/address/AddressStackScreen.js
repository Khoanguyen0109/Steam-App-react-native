import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Address from './Address';
import AddressScreen from './AddressScreen';
import CreateAddress from './CreateAddress';
import { Icon, IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';;

const Stack = createStackNavigator();

function AddressStackScreen() {
  const navigation = useNavigation()
  return (
    <Stack.Navigator initialRouteName='Address'>
      <Stack.Screen
        name='Address'
        options={{
          title: 'Location',
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
        options={{ headerShown: false }}
        component={CreateAddress}
      />
    </Stack.Navigator>
  );
}

export default AddressStackScreen;
