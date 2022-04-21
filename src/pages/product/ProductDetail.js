import {useRoute} from '@react-navigation/native';
import {
  Avatar,
  Center,
  Image,
  ScrollView,
  Spinner,
  Text,
  Toast,
  View,
} from 'native-base';
import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import EButton from '../../components/EButton/Ebutton';
import SizedBox from '../../components/SizeBox/SizeBox';
import {AuthContext} from '../../provider/AuthProvider';
import {AxiosContext} from '../../provider/AxiosProvider';
import { IMAGE_ENDPOINT } from '../../utils';
import { categories } from '../category/utils';

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#EAEAEA',
    width: 375,
    height: 238,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  container: {
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#223263',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#006FBF',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#223263',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#223263',
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9098B1',
  },
});

function ProductDetail(props) {
  const route = useRoute();
  const {id} = route.params;
  const {publicAxios, authAxios} = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  const [productDetail, setProductDetail] = useState({});

  const getProductDetail = async () => {
    try {
      const res = await publicAxios.get(`/products/${route.params?.id}`);
      console.log('res.data', res.data);
      const data = res.data.data;
      setProductDetail({
        ...data,
        image: {uri: `${IMAGE_ENDPOINT}/${data.images[0].name}`},
      });
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  console.log('productDetail.image', productDetail.image)
  useEffect(() => {
    getProductDetail();
  }, []);

  const addToCart = async () => {
    try {
      const res = await authAxios.post('/carts', {
        productId: id,
        quantity: 1,
      });
      Toast.show({description: 'Add To Cart'});
    } catch (error) {
      console.log('error :>> ', error);
      Toast.show({description: 'Add To Cart Failed'});
    }
  };

  if (!productDetail) {
    return (
      <View>
        <Center>
          <Spinner />
        </Center>
      </View>
    );
  }
  const {name, image, price, size, category, description, shop = {}} = productDetail;
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} alt="image" />
      </View>
      <SizedBox height={40} />
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <SizedBox height={16} />
        <Text style={styles.price}> ${price}</Text>
        <SizedBox height={16} />
        <View display="flex" flexDirection="row" alignItems="center">
          {/* <Avatar source={shop.image} /> */}
          <SizedBox width={8} />
          <Text style={styles.title}>
            {shop.firstName} {shop.lastName}
          </Text>
        </View>
        {/* <SizedBox height={24} />
        <Text style={styles.title}>Specification</Text> */}
        <SizedBox height={12} />
        <View
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start">
          <Text style={styles.subtitle}>Category:</Text>
            <Text style={styles.description}>{category?.name}</Text>
        
        </View>
        <SizedBox height={16} />
        <View
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start">
          <Text style={styles.subtitle}>Size</Text>
            <Text style={styles.description}>{size}</Text>
        </View>

        <SizedBox height={16} />
        <Text style={styles.subtitle}>Category:</Text>
        <SizedBox height={8} />

        <Text style={styles.description}>
          {description}
        </Text>
        <SizedBox height={16} />
        <EButton title="Add To Cart" onPress={addToCart} />
      </View>
    </ScrollView>
  );
}

export default ProductDetail;
