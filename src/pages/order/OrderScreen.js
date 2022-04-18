import { format } from 'date-fns';
import { Text, View } from 'native-base';
import React from 'react';
import Layout from '../../layout/Layout';
import { ORDER_STATUS } from '../../utils';
import Order from './components/Order';

function OrderScreen(props) {
  const orders = [
    {
      id: '313',
      date: format(new Date(), 'MMM dd, yyyy'),
      orderStatus: ORDER_STATUS.SHIPPING,
      items: [{ id: 1212, name: 'Product 1' }],
      price: 33455,
    },
  ];
  return (
    <Layout>
      {orders.map((item) => (
        <Order {...item} />
      ))}
    </Layout>
  );
}

export default OrderScreen;
