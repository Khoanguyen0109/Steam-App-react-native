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

function Name() {
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
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    },
  });
  
  const updateProfile = async (data) => {
    console.log('data', data)
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
          name='firstName'
          label='First Name'
          textContentType='username'
          autoCompleteType='name'
          returnKeyType='next'
          rules={{ required: 'First Name is required' }}
        />
        <SizedBox height={24} />
        <FormInput
          control={control}
          name='lastName'
          label='Last Name'
          textContentType='username'
          autoCompleteType='name'
          returnKeyType='next'
          rules={{ required: 'Last Name is required' }}
        />
      </View>
      <EButton title='Save'  onPress={handleSubmit(updateProfile)}/>
    </View>
  );
}

export default Name;
