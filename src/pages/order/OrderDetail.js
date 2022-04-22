import React, {useContext, useState, useEffect} from 'react';
import Layout from '../../layout/Layout';
import {StyleSheet} from 'react-native';
import {Text, View} from 'native-base';
import {useRoute} from '@react-navigation/native';
import ProductOrderRow from './components/ProductOrderRow';
import SizedBox from '../../components/SizeBox/SizeBox';
import Address from '../address/Address';
import PaymentDetail from './components/PaymentDetail';
import {AxiosContext} from '../../provider/AxiosProvider';
import {AuthContext} from '../../provider/AuthProvider';
import {IMAGE_ENDPOINT} from '../../utils';
const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  product: {},
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#223263',
  },
  deliveryAddress: {},
  paymentDetail: {},
});
function OrderDetail(props) {
  const route = useRoute();
  // const orderDetail = {
  //   items: [{}, {}],
  //   delivery: {},
  //   paymentDetail: {},
  // };
  const authContext = useContext(AuthContext);
  const isShop = authContext?.authState?.isShop;
  const {publicAxios, authAxios} = useContext(AxiosContext);
  const url = !isShop
    ? `/orders/${route.params?.id}/users`
    : `orders/${route.params?.id}/shops`;

  const [orderDetail, setOrderDetail] = useState({});
  const address  = orderDetail?.shippingAddress ?? {};
  const getOrderDetail = async () => {
    try {
      const res = await authAxios.get(url);
      console.log('res.data.data', res.data.data);
      console.log('res :>> ', res);
      const data = res.data.data;
      console.log('data[0]', data[0]);
      setOrderDetail(data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getOrderDetail();
  }, []);
  const totalItem = orderDetail?.products?.reduce(function (acc, obj) {
    return acc + obj?.order_products.price;
  }, 0);

  return (
    <Layout>
      <View>
        <Text style={styles.title}>Products</Text>
        <SizedBox height={12} />
        {orderDetail?.products?.map(item => (
          <ProductOrderRow
            id={item.id}
            name={item.name}
            image={{
              uri: `${IMAGE_ENDPOINT}/${item.images[0].name}`,
            }}
            price={item.price}
            quantity={item.order_products.quantity}
          />
        ))}
      </View>
      <SizedBox height={24} />
      <View>
        <Text style={styles.title}>Delivery Address</Text>
        <SizedBox height={12} />
        <Address
          id={address.id}
          name={`${address.firstName} ${address.lastName}`}
          description={`${address.streetAddress}, ${address?.detailAddress}, ${address.city}, ${address.state} , ${address.country} `}
          phone={address.phoneNumber}
        />
      </View>

      <View>
        <Text style={styles.title}>Payment Details</Text>
        <SizedBox height={12} />
        <PaymentDetail price={totalItem} />
      </View>
      <SizedBox height={50} />

    </Layout>
  );
}

export default OrderDetail;
