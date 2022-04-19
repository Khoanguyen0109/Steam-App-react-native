import {
  Button,
  Center,
  Divider,
  Icon,
  KeyboardAvoidingView,
  Link,
  Toast,
  toast,
  View,
} from 'native-base';
import React, {useRef, useState, useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Pressable, SafeAreaView, StyleSheet, Text, Alert} from 'react-native';
import EInput from '../../components/EInput/EInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SizedBox from '../../components/SizeBox/SizeBox';
import EButton from '../../components/EButton/Ebutton';
import FormInput from '../../components/EInput/FormInput';
import {AxiosContext} from '../../provider/AxiosProvider';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../provider/AuthProvider';
import * as Keychain from 'react-native-keychain';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  title: {
    color: '#006FBF',
    fontSize: 16,
    fontWeight: '700',
  },
  subTitle: {
    color: '#9098B1',
    fontSize: 12,
    fontWeight: '400',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  footer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 100, //Here is the trick
  },
  registerLink: {
    color: '#006FBF',
    fontSize: 12,
    fontWeight: '400',
  },
});

function Login(props) {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext)
  const {publicAxios} = useContext(AxiosContext);

  const [show, setShow] = useState(false);

  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data, e) => console.log(data, e);

  const onLogin = async data => {
    try {
      const response = await publicAxios.post('/users/login', {
        email: data.email,
        password: data.password,
      });
      const {token ,user } = response.data;
      authContext.setAuthState({
        currentUser: user,
        accessToken: token,
        authenticated: true,
      });

      await Keychain.setGenericPassword(
        'accessToken',
        JSON.stringify({
          token,
        }),
      );
    } catch (error) {
      Toast.show({description: 'Login Failed'});
    }
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}>
          <Center>
            <Text style={styles.title}>Welcome</Text>
            <SizedBox height={8} />

            <Text style={styles.subTitle}>Sign in to continue</Text>

            <SizedBox height={28} />
          </Center>
          <FormInput
            control={control}
            name="email"
            placeholder="Your mail"
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
            rules={{required: 'Email is required'}}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="mail-outline" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            returnKeyType="next"
          />

          <SizedBox height={8} />
          <FormInput
            control={control}
            name="password"
            placeholder="Password"
            autoCompleteType="password"
            returnKeyType="done"
            secureTextEntry={!show}
            textContentType="password"
            rules={{required: 'Password is required'}}
            // type= {show}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="lock-outline" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            InputRightElement={
              <Icon
                as={
                  <MaterialIcons
                    name={show ? 'visibility' : 'visibility-off'}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
                onPress={() => setShow(!show)}
              />
            }
          />
          <SizedBox height={16} />
          {/* <View style={styles.forgotPasswordContainer}>
            <Text style={styles.textButton}>Forgot password?</Text>
          </View> */}
          {/* <SizedBox height={28} /> */}
          <EButton title="Sign in" onPress={handleSubmit(onLogin)} />
          <SizedBox height={12} />
          <Divider width='full' />
          <SizedBox height={12} />

          <Button
           
            
            onPress={() => navigation.navigate('ShopLogin')}
          >
             Login Shop
          </Button>
          <View style={styles.footer}>
            <Center>
              <Text style={styles.subTitle}>
                Don’t have a account?{' '}
                <Text
                  onPress={() => {
                    navigation.push('Register');
                  }}
                  style={styles.registerLink}>
                  Register
                </Text>
              </Text>
            </Center>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

export default Login;
