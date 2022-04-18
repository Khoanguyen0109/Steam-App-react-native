import {
  Button,
  Icon,
  IconButton,
  Image,
  KeyboardAvoidingView,
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
  const {publicAxios} = useContext(AxiosContext);
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      productName: '',
      size: '',
      description: '',
      category: '',
      price: 1,
      quantity: 2,
    },
  });

  const uploadImage = source => {
    const data = new FormData();
    formdata.append('files', source);
    fetch(`${API_ENDPOINT}/media`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then(response => {
        console.log('image uploaded');
        const json = response.json();
        setImage(`${IMAGE_ENDPOINT}/${json.name}`);
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
        const source = {uri: response.uri};
        uploadImage(source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
      }
    });
  };

  const createProduct = async data => {
    if (id) {
      try {
        const res = await publicAxios.put(`/products/${id}`, {
          ...data,
          price: parseInt(data.price),
          category: parseInt(data.category.id),
          quantity: parseInt(data.quantity),
        });
        Toast.show({description: 'Create Successfully'});
        navigation.goBack();
      } catch (error) {
        Toast.show({description: 'Create Failed'});
      }
    } else {
      try {
        const res = await publicAxios.post('/products', {
          ...data,
        });
        Toast.show({description: 'Create Successfully'});
        navigation.goBack();
      } catch (error) {
        Toast.show({description: 'Create Failed'});
      }
    }
    try {
      const res = await publicAxios.post('/products', {
        ...data,
      });
      Toast.show({description: 'Create Successfully'});
      navigation.goBack();
    } catch (error) {
      Toast.show({description: 'Create Failed'});
    }
  };

  const getProduct = async () => {
    try {
      const res = await publicAxios.get(`/products/${1}`);
      const product = res.data.data;
      console.log('product :>> ', product.price);
      reset({
        ...product,
        productName: product.name,
        price: product.price.toString(),
        category: product.category.id,
        quantity: product.quantity.toString(),
      });
      // setImage(`${IMAGE_ENDPOINT}/${product.images?.[0]?.name}`);
    } catch (error) {}
  };

  useEffect(() => {
    // const {id} = route?.params;

    // if (id) {
    getProduct();
    // }
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
          {image && (
            <Image source={{uri: image}} style={{width: 200, height: 200}} />
          )}
          <SizedBox height={24} />

          <FormInput
            control={control}
            name="productName"
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
            name="category"
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
