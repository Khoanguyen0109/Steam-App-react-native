import React from 'react';

import 'react-native-gesture-handler';
import {useCallback, useContext, useEffect, useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, Spinner} from 'native-base';
import {StyleSheet, Text, View} from 'react-native';
import TabBar from './src/components/Navbar/TabBar';
import Login from './src/pages/auth/Login';
import Register from './src/pages/auth/Register';
import Home from './src/pages/home/Home';
import HomeStackScreen from './src/pages/home/HomeStack';
import Discover from './src/pages/discover/Discover';
import CartStackScreen from './src/pages/cart/CartStackScreen';
import AccountStackScreen from './src/pages/account/AccountStackScreen';
import ShopAccountStackScreen from './src/pages/shopAccount/ShopAccountStackScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext, AuthProvider} from './src/provider/AuthProvider';
import {AxiosProvider} from './src/provider/AxiosProvider';
import ShopLogin from './src/pages/auth/ShopLogin';
import * as Keychain from 'react-native-keychain';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function App() {
  const authContext = useContext(AuthContext);
  const isLogin =
    authContext?.authState?.authenticated && authContext.authState.currentUser;
  const isShop = authContext?.authState?.isShop;
  // const isShop = true;
  // const isLogin = true;
  const [status, setStatus] = useState('loading');
  console.log('authContext', authContext);
  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();

      const jwt = JSON.parse(value.password);
      console.log('jwt', jwt);
      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        authenticated: jwt.accessToken !== null,
        currentUser: jwt.currentUser || null,
      });
      setStatus('success');
    } catch (error) {
      // setStatus('error');
      // console.log(`Keychain Error: ${error.message}`);
      // authContext.setAuthState({
      //   currentUser: null,
      //   accessToken: null,
      //   authenticated: false,
      // });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  // if (status === 'loading') {
  //   return <Spinner />;
  // }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {!isLogin ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              options={{headerShown: false}}
              component={Login}
            />
            <Stack.Screen
              name="ShopLogin"
              options={{headerShown: false}}
              component={ShopLogin}
            />
            <Stack.Screen
              name="Register"
              options={{headerShown: false}}
              component={Register}
            />
          </Stack.Navigator>
        ) : isShop ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              options={{headerShown: false}}
              component={ShopAccountStackScreen}
            />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen
              options={{headerShown: false}}
              name="Home"
              // component={HomeStackScreen}
              component={HomeStackScreen}
            />

            <Tab.Screen
              name="Discover"
              options={{headerShown: false}}
              component={Discover}
            />
            <Tab.Screen
              name="Cart"
              options={{headerShown: false}}
              component={CartStackScreen}
            />

            <Tab.Screen
              name="Account"
              component={AccountStackScreen}
              options={{headerShown: false}}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>

    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
