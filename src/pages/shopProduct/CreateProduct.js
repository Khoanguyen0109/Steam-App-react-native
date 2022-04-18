import {
  Button,
  Icon,
  IconButton,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
} from 'native-base';
import { Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../../components/EInput/FormInput';
import { StyleSheet } from 'react-native';
import Layout from '../../layout/Layout';
import SizedBox from '../../components/SizeBox/SizeBox';
import EButton from '../../components/EButton/Ebutton';
import { categories } from '../category/utils';
// import * as ImagePicker from 'expo-image-picker';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  content: {
    height: 600,
  },
  imageSelect: {
    backgroundColor: '#B0A0A6',
    color: 'black',
    height: 147,
  },
});
function CreateProduct() {
  const [image, setImage] = useState(null);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // console.log(result);

    // if (!result.cancelled) {
    //   setImage(result.uri);
    // }
  };

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView style={styles.root}>
          <IconButton
            onPress={pickImage}
            style={styles.imageSelect}
            icon={
              <Icon
                as={<MaterialIcons name='add-a-photo' />}
                size={12}
                color='black'
              />
            }
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <SizedBox height={24} />

          <FormInput
            control={control}
            name='productName'
            label='Product Name'
            keyboardType='username'
            autoCompleteType='name'
            returnKeyType='next'
            rules={{ required: 'Product Name is required' }}
          />
          <SizedBox height={24} />
          <FormInput
            control={control}
            type='select'
            name='category'
            label='Category'
            items={categories}
            rules={{ required: 'Category is required' }}
          />
          <SizedBox height={24} />
          <FormInput
            control={control}
            name='size'
            label='Size'
            returnKeyType='next'
            rules={{ required: 'Size is required' }}
          />
          <SizedBox height={24} />
          <FormInput
            type='text-area'
            control={control}
            name='description'
            label='Description'
            returnKeyType='next'
            rules={{ required: 'Description is required' }}
          />
          <SizedBox height={24} />
          <FormInput
            control={control}
            name='price'
            label='Price'
            keyboardType='number-pad'
            returnKeyType='next'
            rules={{ required: 'Price is required' }}
          />
          <SizedBox height={24} />
          <FormInput
            control={control}
            name='quantity'
            label='Quantity'
            keyboardType='number-pad'
            returnKeyType='done'
            rules={{ required: 'Price is required' }}
          />
          <SizedBox height={24} />
        </ScrollView>
        <SizedBox height={16} />
        <EButton title='Add Product' />
      </KeyboardAvoidingView>
    </Layout>
  );
}

export default CreateProduct;
