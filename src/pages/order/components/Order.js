import { useNavigation } from '@react-navigation/native';
import { Divider, Pressable, Text, View } from 'native-base';
import React, {useContext, useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import SizedBox from '../../../components/SizeBox/SizeBox';

const styles = StyleSheet.create({
  root: {
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    width: '100%',
    height: 201,
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
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
function Order(props) {
  const { id, date, status , price } = props;
  const navigation = useNavigation();
  const onRoute = () =>{
    navigation.navigate("OrderDetail")
  }
  
  return (
    <Pressable style={styles.root} onPress={onRoute}>
      <Text style={styles.name}>Order #{id}</Text>
      <SizedBox height={12} />
      <Text style={styles.subtitle}>Ordered on {date}</Text>
      {/* <SizedBox height={12} /> */}
    <Divider my={3}/>
    {/* <SizedBox height={12} /> */}

      <View style={styles.box}>
        <Text style={styles.subtitle}>Order Status</Text>
        <Text style={styles.subtitle}>Order</Text>
      </View>
      <SizedBox height={12} />

      <View style={styles.box}>
        <Text style={styles.subtitle}>Item</Text>
        <Text style={styles.subtitle}>Order</Text>
      </View>
      <SizedBox height={12} />

      <View style={styles.box}>
        <Text style={styles.subtitle}>Price</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </Pressable>
  );
}

export default Order;
