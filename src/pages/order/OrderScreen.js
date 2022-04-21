import {format} from 'date-fns';
import {Text, View} from 'native-base';
import Layout from '../../layout/Layout';
import {ORDER_STATUS} from '../../utils';
import Order from './components/Order';
import React, {useContext, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AxiosContext} from '../../provider/AxiosProvider';
import {AuthContext} from '../../provider/AuthProvider';
import SizedBox from '../../components/SizeBox/SizeBox';

function OrderScreen(props) {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const isShop = authContext?.authState?.isShop;
  const url = isShop ? 'orders/users?status=1' : 'orders/users?status=1';
  const [orders, setOrders] = useState([]);
  const {publicAxios, authAxios} = useContext(AxiosContext);
  const getOrderList = async () => {
    try {
      const res = await authAxios.get(url);
      const data = res.data.data;
      console.log('data', data)
      setOrders(data);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);
  return (
    <Layout>
      {orders.map(item => (
        <>
          <Order {...item} />

          <SizedBox height={16} />
        </>
      ))}
    </Layout>
  );
}

export default OrderScreen;
