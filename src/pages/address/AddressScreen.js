import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView, View} from 'native-base';
import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Layout from '../../layout/Layout';
import {AxiosContext} from '../../provider/AxiosProvider';
import Address from './Address';

function AddressScreen() {
  const route = useRoute();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const onRemoveAddress = () => {};
  const [addressList, setAddressList] = useState([]);
  const {publicAxios, authAxios} = useContext(AxiosContext);

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
  useEffect(() => {
    getAddressList();
  }, [isFocused]);
  return (
    <Layout>
      <View>
        {addressList.map(item => (
          <Address
            id={item.id}
            name={`${item.firstName} ${item.lastName}`}
            description={`${item.streetAddress}, ${item?.detailAddress}, ${item.city}, ${item.state} , ${item.country} `}
            phone={item.phoneNumber}
            onEdit={true}
            onRemoveAddress={onRemoveAddress}
          />
        ))}
      </View>
    </Layout>
  );
}

export default AddressScreen;
