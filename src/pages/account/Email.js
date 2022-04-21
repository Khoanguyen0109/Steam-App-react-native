import { useNavigation } from '@react-navigation/native';
import { Text, Toast, View } from 'native-base';
import React, {useContext, useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import EButton from '../../components/EButton/Ebutton';
import FormInput from '../../components/EInput/FormInput';
import SizedBox from '../../components/SizeBox/SizeBox';
import Layout from '../../layout/Layout';
import { AuthContext } from '../../provider/AuthProvider';
import { AxiosContext } from '../../provider/AxiosProvider';

function Email() {
  const authContext = useContext(AuthContext)
  const {authAxios} = useContext(AxiosContext)
  const {currentUser} = authContext.authState
  const isShop = authContext?.authState?.isShop;
 const navigation = useNavigation()
  const url = !isShop
  ? 'users'
  : 'shops'
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: currentUser.email,
    },
  });

  const updateProfile = async (data) => {
    try {
      const res = await  authAxios.put(url , {
        ...data
      })
      navigation.goBack();
      Toast.show({description: "Update Successfully"})
    } catch (error) {
        console.log('error', error)
        Toast.show({description: "Update Failed"})
    }
  

  }

  return (
    <View
      height='100%'
      backgroundColor={'white'}
      paddingY={3}
      paddingX={3}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
    >
      <View>
        <FormInput
          control={control}
          name='email'
          label='Email'
          textContentType='username'
          autoCompleteType='name'
          returnKeyType='next'
          rules={{ required: 'Email is required' }}
        />
        <SizedBox height={24} />
      </View>
      <EButton title='Save' onPress={handleSubmit(updateProfile)} />
    </View>
  );
}

export default Email;
