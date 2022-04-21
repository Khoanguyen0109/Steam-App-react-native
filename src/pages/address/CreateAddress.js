import { KeyboardAvoidingView, ScrollView, Text, Toast } from 'native-base';
import { Dimensions } from 'react-native';

import React, {useContext, useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../../components/EInput/FormInput';
import { StyleSheet } from 'react-native';
import Layout from '../../layout/Layout';
import SizedBox from '../../components/SizeBox/SizeBox';
import EButton from '../../components/EButton/Ebutton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AxiosContext } from '../../provider/AxiosProvider';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  content: {
    height: 500,
  },
});
function CreateAddress() {
  const route = useRoute()
  const params = route.params
  console.log('params :>> ', params);
  const navigation = useNavigation()
  const {publicAxios, authAxios} = useContext(AxiosContext);

  const { control, handleSubmit , reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      country: '',
      zipCode: '',
      state: '',
      city: '',
      streetAddress: '',
      detailAddress: '',

    },
  });

  const createAddress = async(data) => {
      if(params?.id){
        try {
          const res = await authAxios.put(`/shippingAddresses/${params.id}`, {
            ...data,
          });
          Toast.show({description: 'Edit Successfully'});
          navigation.goBack();
        } catch (error) {
          console.log('error', error.response.data)
          Toast.show({description: 'Edit Failed'});
        }
      }else{
        try {
          const res = await authAxios.post('/shippingAddresses', {
            ...data,
          });
          console.log('data', data)
          console.log('res.data', res.data)
          Toast.show({description: 'Create Successfully'});
          navigation.goBack();
        } catch (error) {
          console.log('error', error.response.data)
          Toast.show({description: 'Create Failed'});
        }
      }
  }
  const getAddress = async () =>{
    try {
      const res = await authAxios.get(`/shippingAddresses/${params.id}`);
      console.log('res.data', res.data.data)
      reset(res.data.data)
    } catch (error) {
      console.log('error', error.response.data)
    }
  }
  
  useEffect(() => {
    console.log('params', params)
    if(params?.id){
      getAddress()

    }
  
  }, [params?.id])

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView style={styles.root}>
          <FormInput
            control={control}
            name='country'
            label='Country Region'
            textContentType='username'
            autoCompleteType='name'
            returnKeyType='next'
            rules={{ required: 'Country Region is required' }}
          />
          <SizedBox height={24} />

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
          <SizedBox height={24} />
          <FormInput
            control={control}
            name='streetAddress'
            label='Stress Address'
            textContentType='username'
            autoCompleteType='name'
            returnKeyType='next'
            rules={{ required: 'Stress Address is required' }}
          />
          <SizedBox height={24} />
          <FormInput
            control={control}
            name='detailAddress'
            label='Stress Address 2 (Optional)'
            textContentType='username'
            autoCompleteType='name'
            returnKeyType='next'
          />
          <SizedBox height={24} />
          <FormInput
            control={control}
            name='city'
            label='City'
            textContentType='username'
            autoCompleteType='name'
            returnKeyType='next'
            rules={{ required: 'City is required' }}
          />
          <SizedBox height={24} />
          <FormInput
            control={control}
            name='state'
            label='State/Province/Region'
            textContentType='username'
            autoCompleteType='name'
            returnKeyType='next'
            rules={{ required: 'State/Province/Region is required' }}
          />
          <SizedBox height={24} />
          <FormInput
            control={control}
            name='zipCode'
            label='Zip Code'
            textContentType='username'
            autoCompleteType='name'
            returnKeyType='next'
            rules={{ required: 'Zip Code is required' }}
          />
          <SizedBox height={24} />
          <FormInput
            control={control}
            name='phoneNumber'
            label='Phone'
            textContentType='telephoneNumber'
            returnKeyType='done'
            rules={{ required: 'Phone is required' }}
          />
          <SizedBox height={24} />
        </ScrollView>
        <SizedBox height={16} />
        <EButton title={ params?.id ? "Edit Address":'Add Address' }onPress={handleSubmit(createAddress)}  />
        </KeyboardAvoidingView>
    </Layout>
  );
}

export default CreateAddress;
