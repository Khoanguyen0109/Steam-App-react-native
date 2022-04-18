import { ScrollView, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Layout from '../../layout/Layout';
import Address from './Address';

function AddressScreen() {
  const addressList = [1, 2];
  const onRemoveAddress = () => {};
  return (
    <Layout>
      <View>
        {addressList.map((item) => (
          <Address
            name='Presecet'
            description='3711 Spring Hill Rd undefined Tallahassee, Nevada 52874 United States'
            phone='+99 1234567890'
            onRemoveAddress={onRemoveAddress}
          />
        ))}
      </View>
    </Layout>
  );
}

export default AddressScreen;
