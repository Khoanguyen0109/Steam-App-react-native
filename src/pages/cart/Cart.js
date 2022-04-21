import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Text, View} from 'native-base';
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
  const [cart, setCart] = useState([]);
  const {publicAxios, authAxios} = useContext(AxiosContext);
  const onRemoveProduct = () => {};

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
      setCartList(cartList);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  useEffect(() => {
    getCart();
  }, [isFocused]);
  const totalItem = cartList.reduce(function (acc, obj) {
    console.log('acc', obj);
    return acc + obj?.quantity * obj?.product.price;
  }, 0);

  const updateCartItem = async(cartItem , quantity) => {
    console.log('cartItem :>> ', cartItem);
    try {
      const res = await authAxios.put(`carts/${cartItem.id}`, {
        quantity: quantity
      })
      if(quantity ===0 ){
        getCart();

      }
    } catch (error) {
      
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
      {cartList.length > 0 && (
        <>
          <SizedBox height={32} />
          <View style={styles.summary}>
            <View style={styles.summaryItem}>
              <Text fontSize={12}>Items ({`${cartList.length}`})</Text>
              <Text fontSize={12}>${totalItem}</Text>
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
                ${totalItem}
              </Text>
            </View>
          </View>
          <SizedBox height={16} />
          <EButton
            title="Check out"
            onPress={() => navigation.navigate('ShipTo', {fromCart: true})}
          />
        </>
      )}
    </ScrollView>
  );
}

export default Cart;
