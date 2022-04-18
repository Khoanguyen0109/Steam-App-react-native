import React from 'react';
import Layout from '../../layout/Layout';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import { useRoute } from '@react-navigation/native';
import ProductOrderRow from './components/ProductOrderRow';
import SizedBox from '../../components/SizeBox/SizeBox';
import Address from '../address/Address';
import PaymentDetail from './components/PaymentDetail';
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
  const orderDetail = {
    items: [{}, {}],
    delivery: {},
    paymentDetail: {},
  };
  const { items } = orderDetail;
  return (
    <Layout>
      <View>
        <Text style={styles.title}>Products</Text>
        <SizedBox height={12} />
        {items.map((item) => (
          <ProductOrderRow
            name='FS - Nike Air Max 270 React Native Native Native'
            image={{
              uri: 'https://static.nike.com/a/images/t_default/lvzcsilw4gmh2gi2hiq4/revolution-5-road-running-shoes-szF7CS.png',
            }}
            price={204}
            quantity={2}
          />
        ))}
      </View>
      <SizedBox height={24} />
      <View>
        <Text style={styles.title}>Delivery Address</Text>
        <SizedBox height={12} />
        <Address name='' description='' phone='121212' />
      </View>
      <View>
        <Text style={styles.title}>Delivery Address</Text>
        <SizedBox height={12} />
        <PaymentDetail 
        price={12121}
        / >
      </View>
    </Layout>
  );
}

export default OrderDetail;
