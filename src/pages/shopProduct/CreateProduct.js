import {
  Button,
  Icon,
  IconButton,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  Toast,
} from 'native-base';
import {Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';

import React, {useState, useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import FormInput from '../../components/EInput/FormInput';
import {StyleSheet} from 'react-native';
import Layout from '../../layout/Layout';
import SizedBox from '../../components/SizeBox/SizeBox';
import EButton from '../../components/EButton/Ebutton';
import {categories} from '../category/utils';
import {API_ENDPOINT, IMAGE_ENDPOINT, optionsImagePicker} from '../../utils';
import {AxiosContext} from '../../provider/AxiosProvider';
import {useNavigation, useRoute} from '@react-navigation/native';
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
  const route = useRoute();
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const {  authAxios ,publicAxios} = useContext(AxiosContext);
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      name: '',
      size: '',
      description: '',
      categoryId: '',
      price: 1,
      quantity: 2,
    },
  });

  const uploadImage = source => {
    console.log('source', source);
    const formdata = new FormData();
    console.log('formdata', formdata);
    formdata.append("files", source)
    fetch(`https://api.ntustreamhub.com/media`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('response', data.data[0].name);
        setImage( {uri: `${IMAGE_ENDPOINT}/${data.data[0].name}`, id:data.data[0].id });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const image = response.assets?.[0];
        const source = {
          uri: image?.uri,
          type: image?.type,
          fileName: image.fileName,
          name: image.fileName,
        };
        uploadImage(source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
      }
    });
  };
  console.log('id :>> ', route?.params?.id);

  const createProduct = async data => {
    if (route?.params?.id) {
      try {
        const res = await authAxios.put(`/products/${route?.params?.id}`, {
          ...data,
          price: parseInt(data.price),
          category: parseInt(data.categoryId),
          quantity: parseInt(data.quantity),
        });
        Toast.show({description: 'Update Successfully'});
        navigation.goBack();
      } catch (error) {
        console.log('error :>> ', error);
        Toast.show({description: 'Update Failed'});
      }
    } else {
      try {
        const res = await authAxios.post('/products', {
          ...data,
          imageIds: [image.id]
        });
        Toast.show({description: 'Create Successfully'});
        navigation.goBack();
      } catch (error) {
        console.log('error :>> ', error.response.data);

        Toast.show({description: 'Create Failed'});
      }
    }
   
  };

  const getProduct = async () => {
    try {
      const res = await authAxios.get(`/products/${route?.params?.id}`);
      const product = res.data.data;
      console.log('product :>> ', product);
      reset({
        ...product,
        name: product.name,
        price: product.price.toString(),
        categoryId: product.categoryId,
        quantity: product.quantity.toString(),
      });
      setImage( {uri :`${IMAGE_ENDPOINT}/${product.images?.[0]?.name}` });
    } catch (error) {
      console.log('error', error)
    }
  };

  useEffect(() => {
    if (route?.params?.id) {
      console.log('first', route?.params?.id)

      getProduct();
    }
    return () => {
      reset();
    };
  }, []);
  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}>
        <ScrollView style={styles.root}>
          {!image && (
            <IconButton
              onPress={chooseImage}
              style={styles.imageSelect}
              icon={
                <Icon
                  as={<MaterialIcons name="add-a-photo" />}
                  size={12}
                  color="black"
                />
              }
            />
          )}
          {image && (
            <Pressable onPress={chooseImage}>
              <Image
                source={image}
                style={{width: '100%', height: 200}}
              />
            </Pressable>
          )}
          <SizedBox height={24} />

          <FormInput
            control={control}
            name="name"
            label="Product Name"
            keyboardType="username"
            autoCompleteType="name"
            returnKeyType="next"
            rules={{required: 'Product Name is required'}}
          />
          <SizedBox height={24} />
          <FormInput
            control={control}
            type="select"
            name="categoryId"
            label="Category"
            autoCompleteType="name"
            items={categories}
            rules={{required: 'Category is required'}}
          />
          <SizedBox height={24} />
          <FormInput
            control={control}
            name="size"
            label="Size"
            returnKeyType="next"
            rules={{required: 'Size is required'}}
          />
          <SizedBox height={24} />
          <FormInput
            control={control}
            name="description"
            autoCompleteType="name"
            label="Description"
            returnKeyType="next"
            rules={{required: 'Description is required'}}
          />
          <SizedBox height={24} />
          <FormInput
            control={control}
            name="price"
            label="Price"
            autoCompleteType="name"
            keyboardType="number-pad"
            returnKeyType="next"
            rules={{required: 'Price is required'}}
          />
          <SizedBox height={24} />
          <FormInput
            control={control}
            name="quantity"
            label="Quantity"
            keyboardType="number-pad"
            returnKeyType="done"
            rules={{required: 'Quantity is required'}}
          />
          <SizedBox height={24} />
        </ScrollView>
        <SizedBox height={16} />
        <EButton title="Add Product" onPress={handleSubmit(createProduct)} />
      </KeyboardAvoidingView>
    </Layout>
  );
}

export default CreateProduct;
