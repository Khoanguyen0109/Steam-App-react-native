import { Icon, IconButton, View, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import SizedBox from '../../../components/SizeBox/SizeBox';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderColor: '#EBF0FF',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#223263',
  },
  subtitle: {
    color: '#9098B1',
    fontSize: 12,
    fontWeight: '400',
  },
  price: {
    color: '#006FBF',
    fontSize: 12,
    fontWeight: '700',
  },
});
function PaymentDetail(props) {
  const { id, name, description, phone, onEdit, onRemove , price} = props;
  return (
    <View style={styles.root}>
      <View style={styles.box}>
        <Text style={styles.subtitle}>Order Status</Text>
        <Text style={styles.subtitle}>Order</Text>
      </View>
      <SizedBox height={12} />

      <View style={styles.box}>
        <Text style={styles.subtitle}>Item</Text>
        <Text style={styles.subtitle}>Order</Text>
      </View>
      <SizedBox height={30} />
      <View style={styles.box}>
        <Text style={styles.subtitle}>Price</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
}

export default PaymentDetail;
