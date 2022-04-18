import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import EButton from '../../components/EButton/Ebutton';
import SizedBox from '../../components/SizeBox/SizeBox';
import ProductRow from './components/ProductRow';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  summary: {
    borderColor: '#EBF0FF',
    borderWidth: 1,
    height: 131,
    width: '100%',
    padding: 16,
    borderRadius: 5,
  },
  summaryItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function Cart(props) {
  const navigation = useNavigation();
  const cartList = [1, 2];
  const totalItemPrice = 3212;
  const onRemoveProduct = () => {};

  return (
    <ScrollView style={styles.root}>
      {cartList.map((item) => (
        <ProductRow
          name='FS - Nike Air Max 270 React Native Native Native'
          image={{
            uri: 'https://static.nike.com/a/images/t_default/lvzcsilw4gmh2gi2hiq4/revolution-5-road-running-shoes-szF7CS.png',
          }}
          price={204}
          onRemoveProduct={onRemoveProduct}
        />
      ))}
      <SizedBox height={32} />
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text fontSize={12}>Items ({`${cartList.length}`})</Text>
          <Text fontSize={12}>${totalItemPrice}</Text>
        </View>
        <SizedBox height={12} />
        <View style={styles.summaryItem}>
          <Text fontSize={12}>Shipping</Text>
          <Text fontSize={12}> Free</Text>
        </View>
        <SizedBox height={12} />
        <View style={styles.summaryItem}>
          <Text fontSize={12} fontWeight='700' color='#223263'>
            Total
          </Text>
          <Text fontSize={12} fontWeight='700' color='#006FBF'>
            {' '}
            $12321312
          </Text>
        </View>
      </View>
      <SizedBox height={16} />
      <EButton
        title='Check out'
        onPress={() => navigation.navigate('ShipTo')}
      />
    </ScrollView>
  );
}

export default Cart;
