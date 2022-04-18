import { KeyboardAvoidingView, ScrollView, Text } from 'native-base';
import { Dimensions } from 'react-native';

import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../../components/EInput/FormInput';
import { StyleSheet } from 'react-native';
import Layout from '../../layout/Layout';
import SizedBox from '../../components/SizeBox/SizeBox';
import EButton from '../../components/EButton/Ebutton';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  content: {
    height: 700,
  },
});
function CreateAddress() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView style={styles.root}>
          <FormInput
            control={control}
            name='countryRegion'
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
            name='streetAddress2'
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
            name='phone'
            label='Phone'
            textContentType='telephoneNumber'
            returnKeyType='done'
            rules={{ required: 'Phone is required' }}
          />
          <SizedBox height={24} />
        </ScrollView>
        <SizedBox height={16} />
        <EButton title='Add Address' />
      </KeyboardAvoidingView>
    </Layout>
  );
}

export default CreateAddress;
