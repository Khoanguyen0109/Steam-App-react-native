import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'native-base';
import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import EButton from '../../components/EButton/Ebutton';
import SizedBox from '../../components/SizeBox/SizeBox';
import {AxiosContext} from '../../provider/AxiosProvider';
import { IMAGE_ENDPOINT } from '../../utils';
import ProductRow from './components/ProductRow';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  summary: {
    borderColor: '#EBF0FF',
    borderWidth: 1,
    height: 131,
    width: '100%',
    padding: 16,
    borderRadius: 5,
  },
  summaryItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function Cart(props) {
  const navigation = useNavigation();
  // const cartList = [1, 2];
  const [cartList, setCartList] = useState([])
  const totalItemPrice = 3212;
  const {publicAxios, authAxios} = useContext(AxiosContext);
  console.log('cartList', cartList)
  const onRemoveProduct = () => {};

  const getCart = async () => {
    try {
      const res = await authAxios.get('/carts');
      console.log('rest.data.data :>> ', res.data.data);
      const data = res.data.data

      if(data?.[0]){
        setCartList(data[0].cartItems)

      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  useEffect(()=>{
    getCart()
  },[])
  return (
    <ScrollView style={styles.root}>
      {cartList.map(item => (
        <ProductRow
          name={item.name}
          image={{
            uri: `${IMAGE_ENDPOINT}/${item.images?.[0].name}`,
          }}
          price={item.price}
          onRemoveProduct={onRemoveProduct}
        />
      ))}
      <SizedBox height={32} />
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text fontSize={12}>Items ({`${cartList.length}`})</Text>
          <Text fontSize={12}>${totalItemPrice}</Text>
        </View>
        <SizedBox height={12} />
        <View style={styles.summaryItem}>
          <Text fontSize={12}>Shipping</Text>
          <Text fontSize={12}> Free</Text>
        </View>
        <SizedBox height={12} />
        <View style={styles.summaryItem}>
          <Text fontSize={12} fontWeight="700" color="#223263">
            Total
          </Text>
          <Text fontSize={12} fontWeight="700" color="#006FBF">
            {' '}
            $12321312
          </Text>
        </View>
      </View>
      <SizedBox height={16} />
      <EButton
        title="Check out"
        onPress={() => navigation.navigate('ShipTo')}
      />
    </ScrollView>
  );
}

export default Cart;
