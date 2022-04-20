import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView, View} from 'native-base';
import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import EButton from '../../components/EButton/Ebutton';
import Layout from '../../layout/Layout';
import {AxiosContext} from '../../provider/AxiosProvider';
import Address from './Address';

function AddressScreen() {
  const route = useRoute();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const onRemoveAddress = () => {};
  const [selectedAddress, setSelectedAddress] = useState();
  const [addressList, setAddressList] = useState([]);
  const {publicAxios, authAxios} = useContext(AxiosContext);
  const [cart, setCart] = useState([]);
  const getAddressList = async () => {
    try {
      const res = await authAxios.get('/shippingAddresses');
      const data = res.data.data;
      console.log('data', data);
      setAddressList(data);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  const getCart = async () => {
    try {
      const res = await authAxios.get('/carts');
      const data = res.data.data;
      setCart(data);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  const removeAddress = async id => {
    try {
      console.log('id', id);
      const res = await authAxios.delete(`/shippingAddresses/${id}`);
      const filter = addressList.filter(item => item.id !== id);
      console.log('addressList', addressList);
      setAddressList([...filter]);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  useEffect(() => {
    getAddressList();
    getCart();
  }, [isFocused]);
  const onCreateOrder = async shopItem => {
    try {
      const items = shopItem.cartItems.map(item => item.product.id);
      const res = await authAxios.post('/orders', {
        shopId: shopItem?.id,
        cartItems: items,
        shippingAddressId: selectedAddress,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const creatMultiOrder = async () => {
    cart.forEach(shopItem => onCreateOrder(shopItem));
  };

  return (
    <Layout>
      <ScrollView>
        {addressList.map(item => (
          <Address
            onSelect={() => setSelectedAddress(item)}
            selected={selectedAddress?.id === item.id}
            id={item.id}
            name={`${item.firstName} ${item.lastName}`}
            description={`${item.streetAddress}, ${item?.detailAddress}, ${item.city}, ${item.state} , ${item.country} `}
            phone={item.phoneNumber}
            onEdit={true}
            onRemoveAddress={removeAddress}
          />
        ))}
      </ScrollView>
      {route.params?.fromCart && selectedAddress && (
        <EButton title={'Create Order'} onPress={creatMultiOrder} />
      )}
    </Layout>
  );
}

export default AddressScreen;
