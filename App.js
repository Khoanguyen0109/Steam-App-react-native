import React from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   StatusBar,
//   Dimensions,
//   TouchableOpacity,
//   PermissionsAndroid,
// } from 'react-native';

// import {NodeCameraView} from 'react-native-nodemediaclient';

// const styles = StyleSheet.create({
//   view: {
//     height: Dimensions.get('window').height,
//     width: Dimensions.get('window').width,
//     position: 'relative',
//   },
//   buttonWrapper: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: Dimensions.get('window').width,
//     height: 50,
//     position: 'absolute',
//     zIndex: 2,
//     bottom: 50,
//   },
//   button: {
//     width: 200,
//     height: 40,
//     backgroundColor: '#014484',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingLeft: 15,
//     paddingRight: 15,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontFamily: 'system',
//   },
// });

// class App extends React.Component {
//   vb = null;

//   state = {
//     isStreaming: false,
//   };

//   videoSettings = {
//     preset: 12,
//     bitrate: 400000,
//     profile: 1,
//     fps: 15,
//     videoFrontMirror: false,
//   };

//   cameraSettings = {cameraId: 1, cameraFrontMirror: true};

//   audioSettings = {bitrate: 32000, profile: 1, samplerate: 44100};

//   channel = 'nodeskwela';

//   get height() {
//     return Dimensions.get('window').height;
//   }

//   get width() {
//     return Dimensions.get('window').width;
//   }

//   toggleStream = async () => {
//     await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

//     if (this.state.isStreaming) {
//       this.vb.stop();
//     } else {
//       this.vb.start();
//     }
//     this.setState({
//       isStreaming: !this.state.isStreaming,
//     });
//   };

//   render() {
//     return (
//       <>
//         <StatusBar barStyle="dark-content" />
//         <View style={styles.view}>
//           <NodeCameraView
//             style={{
//               height: this.height,
//               width: this.width,
//               zIndex: 1,
//               backgroundColor: '#000000',
//             }}
//             ref={vb => {
//               this.vb = vb;
//             }}
//             outputUrl={`rtmp://YOUR-IP-ADDRESS/live/${this.channel}`}
//             camera={this.cameraSettings}
//             audio={this.audioSettings}
//             video={this.videoSettings}
//             autopreview={true}></NodeCameraView>
//           <View style={styles.buttonWrapper}>
//             <TouchableOpacity onPress={this.toggleStream}>
//               <View style={styles.button}>
//                 <Text style={styles.buttonText}>
//                   {this.state.isStreaming
//                     ? 'Stop Streaming'
//                     : 'Start Streaming'}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//             {/* <TouchableOpacity onPress  ​={this.toggleStream}>
//               <View style={styles.button}>
//                 <Text style={styles.buttonText}>
//                   {this.state.isStreaming
//                     ? 'Stop Streaming'
//                     : 'Start Streaming'}
//                 </Text>
//               </View>
//             </TouchableOpacity> */}
//           </View>
//         </View>
//       </>
//     );
//   }
// }

// export default App;

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
  const isShop = false;
  const authContext = useContext(AuthContext);
  const isLogin = authContext?.authState?.authenticated;
  // const isLogin = false;
  console.log('isLogin', isLogin)
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        currentUser: null,
        accessToken: null,
        authenticated: false,
      });
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
            ) : (
              <Tab.Navigator>
                <Tab.Screen
                  options={{headerShown: false}}
                  name="Home"
                  // component={HomeStackScreen}
                  component={isShop ? ShopAccountStackScreen : HomeStackScreen}
                />

                <Tab.Screen name="Discover" component={Discover} />
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
