import {useRoute} from '@react-navigation/native';
import {Avatar, Center, Image, ScrollView, Spinner, Text, Toast, View} from 'native-base';
import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import EButton from '../../components/EButton/Ebutton';
import SizedBox from '../../components/SizeBox/SizeBox';
import { AuthContext } from '../../provider/AuthProvider';
import { AxiosContext } from '../../provider/AxiosProvider';

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#EAEAEA',
    width: 375,
    height: 238,
  },
  image: {
    width: '100%',
    height: '100%',
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
  const {publicAxios , authAxios} = useContext(AxiosContext);
  const authContext = useContext(AuthContext)
  const [productDetail, setProductDetail] = useState({});
  const product = {
    name: 'Nike Air Zoom Pegasus 36 Miami',
    image: {
      uri: 'https://static.nike.com/a/images/t_default/lvzcsilw4gmh2gi2hiq4/revolution-5-road-running-shoes-szF7CS.png',
    },
    price: 12,
    shop: {
      shopName: 'Mint',
      image: {
        uri: '',
      },
    },
  };
  const getProductDetail = async () => {
    try {
      const res = await publicAxios.get(`/products/${1}`);
      console.log('res.data', res.data)
      setProductDetail(res.data.data);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  useEffect(() => {
    getProductDetail();
  }, []);

  const addToCart = async() => {
    try {
        const res = await authAxios.post('/carts' , {
          productId: id,
          quantity: 1
        })
        Toast.show({description: "Add To Cart"})
    } catch (error) {
        console.log('error :>> ', error);
        Toast.show({description: "Add To Cart Failed"})

    }
  }

  if(!productDetail) {
    return <View>
      <Center>
        <Spinner/>
      </Center>
    </View>
  }
  const {name, image, price, shop = {}} = productDetail;

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} alt="image" />
      </View>
      <SizedBox height={40} />
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <SizedBox height={16} />
        <Text style={styles.price}> {price}</Text>
        <SizedBox height={16} />
        <View display="flex" flexDirection="row" alignItems="center">
          {/* <Avatar source={shop.image} /> */}
          <SizedBox width={8} />
          <Text style={styles.title}>{shop.firstName} {shop.lastName}</Text>
        </View>
        <SizedBox height={24} />
        <Text style={styles.title}>Specification</Text>
        <SizedBox height={12} />
        <View
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start">
          <Text style={styles.subtitle}>Shown</Text>
          <View display="flex" flexDirection="column" alignItems="flex-end">
            <Text style={styles.description}>Laser</Text>
            <Text style={styles.description}>Laser</Text>
            <Text style={styles.description}>
              Laser Blue/Anthracite/Watermelon/White
            </Text>
          </View>
        </View>
        <SizedBox height={16} />
        <View
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start">
          <Text style={styles.subtitle}>Shown</Text>
          <View display="flex" flexDirection="column" alignItems="flex-end">
            <Text style={styles.description}>Laser</Text>
          </View>
        </View>

        <SizedBox height={16} />

        <Text style={styles.description}>
          The Nike Air Max 270 React ENG combines a full-length React foam
          midsole with a 270 Max Air unit for unrivaled comfort and a striking
          visual experience.
        </Text>
        <SizedBox height={16} />
        <EButton title="Add To Cart"  onPress={addToCart}/>
      </View>
    </ScrollView>
  );
}

export default ProductDetail;
