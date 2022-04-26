import {useIsFocused, useNavigation} from '@react-navigation/native';
import { cloneDeep } from 'lodash';
import {Center, Text, View} from 'native-base';
import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import EButton from '../../components/EButton/Ebutton';
import SizedBox from '../../components/SizeBox/SizeBox';
import {AxiosContext} from '../../provider/AxiosProvider';
import {IMAGE_ENDPOINT} from '../../utils';
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
  const isFocused = useIsFocused();
  const [cartList, setCartList] = useState([]);
  const [quantity, setQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [cart, setCart] = useState([]);
  const {publicAxios, authAxios} = useContext(AxiosContext);
  const onRemoveProduct = async(cartItemId) => {
    try {
      const res = await authAxios.delete(`carts/${cartItemId}`)  
      getCart()
    } catch (error) {
      
    }
  };

  const getCart = async () => {
    try {
      const res = await authAxios.get('/carts');
      const data = res.data.data;
      setCart(data);
      const cartList = [];
      data.map(cartShop => {
        cartShop.cartItems.map(item => {
          cartList.push(item);
        });
        // cartList.push(cartShop.cartItems);
      });
      setCartList( cloneDeep( cartList));
      const totalItem = cartList.reduce(function (acc, obj) {
        return acc + (obj?.quantity * obj?.product.price);
      }, 0);
      const quantity = cartList.reduce(function (acc, obj) {
        return acc + (obj?.quantity);
      }, 0);

      setTotalPrice(totalItem)
      setQuantity(quantity)
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  useEffect(() => {
    getCart();
  }, [isFocused]);
  
  const updateCartItem = async(cartItem , quantity) => {
    try {
      const res = await authAxios.put(`carts/${cartItem}`, {
        quantity: quantity
      })
      // if(quantity ===0 ){
        getCart();

      // }
    } catch (error) {
      console.log('error :>> ', error.response.data);
    }
  }

  const updateCart = () => {};
  return (
    <ScrollView style={styles.root}>
      {cartList.map(item => (
        <ProductRow
          key={item.id}
          cartItemId={item.id}
          name={item?.product?.name}
          image={{
            uri: `${IMAGE_ENDPOINT}/${item?.product?.images?.[0].name}`,
          }}
          price={item?.product?.price}
          quantity={item.quantity}
          updateCartItem={updateCartItem}
          onRemoveProduct={onRemoveProduct}
        />
      ))}
      {cartList.length > 0 ? (
        <>
          <SizedBox height={32} />
          <View style={styles.summary}>
            <View style={styles.summaryItem}>
              <Text fontSize={12}>Items ({`${quantity}`})</Text>
              <Text fontSize={12}>${totalPrice}</Text>
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
                ${totalPrice}
              </Text>
            </View>
          </View>
          <SizedBox height={16} />
          <EButton
            title="Check out"
            onPress={() => navigation.navigate('ShipTo', {fromCart: true})}
          />
        </>
      ) : <Center>
          <Text>
              Cart is Empty
          </Text>
        </Center>}
    </ScrollView>
  );
}

export default Cart;
