import { Text, View } from 'native-base';
import React from 'react';
import { useForm } from 'react-hook-form';
import EButton from '../../components/EButton/Ebutton';
import FormInput from '../../components/EInput/FormInput';
import SizedBox from '../../components/SizeBox/SizeBox';
import Layout from '../../layout/Layout';

function Name() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

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
      <EButton title='Save' />
    </View>
  );
}

export default Name;
