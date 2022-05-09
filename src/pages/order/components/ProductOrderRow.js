import { IconButton, Image, Text, View, Icon } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import SizedBox from '../../../components/SizeBox/SizeBox';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',

    position: 'relative',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 104,
    padding: 16,
    borderColor: '#EBF0FF',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  image: {
    width: 72,
    height: 72,
  },
  content: {
    flex: 2,
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    color: '#223263',
  },
  price: {
    color: '#006FBF',
    fontSize: 12,
    fontWeight: '700',
  },
  quantity: {
    fontSize: 12,
    color: '#223263',
  },
});
function ProductOrderRow(props) {
  const { onRemoveProduct, name, price, image, quantity } = props;

  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} alt='image' />
      </View>
      <SizedBox width={12} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <SizedBox height={18} />
        <View
          width='full'
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
        >
          <Text style={styles.price}>{price}$</Text>
          <Text style={styles.quantity}>Qty: {quantity}</Text>
        </View>
      </View>
      <SizedBox width={12} />

      <View style={styles.action}></View>
    </View>
  );
}

export default ProductOrderRow;
