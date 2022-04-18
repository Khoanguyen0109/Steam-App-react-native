import { KeyboardAvoidingView, ScrollView, Text } from 'native-base';
import { Dimensions } from 'react-native';

import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../../components/EInput/FormInput';
import { StyleSheet } from 'react-native';
import Layout from '../../layout/Layout';
import SizedBox from '../../components/SizeBox/SizeBox';
import EButton from '../../components/EButton/Ebutton';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  content: {
    height: 600,
  },
});
function CreateLiveStream() {
  const navigation = useNavigation();
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
            name='title'
            label='Title'
            textContentType='username'
            autoCompleteType='name'
            returnKeyType='next'
            rules={{ required: 'Country Region is required' }}
          />
          <SizedBox height={24} />

          <FormInput
            control={control}
            name='description'
            label='Description'
            textContentType='username'
            autoCompleteType='name'
            returnKeyType='done'
            rules={{ required: 'First Name is required' }}
          />
          <SizedBox height={24} />
        </ScrollView>
        <SizedBox height={16} />
        <EButton
          title='Create'
          onPress={() => navigation.navigate('LiveStream')}
        />
      </KeyboardAvoidingView>
    </Layout>
  );
}

export default CreateLiveStream;
