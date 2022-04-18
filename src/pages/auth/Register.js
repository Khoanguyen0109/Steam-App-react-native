import {Center, Icon, KeyboardAvoidingView, Text, Toast, View} from 'native-base';
import React, {useState , useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {SafeAreaView, StyleSheet} from 'react-native';
import EInput from '../../components/EInput/EInput';
import SizedBox from '../../components/SizeBox/SizeBox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EButton from '../../components/EButton/Ebutton';
import FormInput from '../../components/EInput/FormInput';
import {useNavigation} from '@react-navigation/native';
import { AxiosContext } from '../../provider/AxiosProvider';

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
function Register(props) {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const {publicAxios} = useContext(AxiosContext);
  
  const {control, handleSubmit} = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onRegister = async (data) => {
    console.log('data :>> ', data);
    try {
      const response = await publicAxios.post('/users/register', {
        ...data,
      });

      Toast.show({description: 'Register Success'});
      navigation.navigate('Login');
    } catch (error) {
      console.log('error', error)
      Toast.show({description: 'Register Failed'});
    }
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}>
          <Center>
            <Text style={styles.title}>Let’s Get Started</Text>
            <SizedBox height={8} />

            <Text style={styles.subTitle}>Create an new account</Text>

            <SizedBox height={28} />
          </Center>
          <FormInput
            control={control}
            name="firstName"
            placeholder="First Name"
            textContentType="username"
            autoCompleteType="name"
            returnKeyType="next"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person-outline" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />
          <SizedBox height={8} />
          <FormInput
            control={control}
            name="lastName"
            placeholder="Last Name"
            textContentType="username"
            autoCompleteType="name"
            returnKeyType="next"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person-outline" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />

          <SizedBox height={8} />
          <FormInput
            control={control}
            name="email"
            placeholder="Your mail"
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
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
            returnKeyType="next"
            secureTextEntry={true}
            textContentType="password"
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
          <SizedBox height={8} />
          <FormInput
            control={control}
            name="confirmPassword"
            placeholder="Password Again"
            autoCompleteType="password"
            returnKeyType="done"
            secureTextEntry={true}
            textContentType="password"
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
          <EButton title={'Sign up '}  onPress={handleSubmit(onRegister)}/>
          <SizedBox height={16} />

          <Center>
            <Text style={styles.subTitle}>
              Have a account?{' '}
              <Text
                onPress={() => {
                  navigation.push('Login');
                }}
                style={styles.registerLink}>
                Sign in
              </Text>
            </Text>
          </Center>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

export default Register;
