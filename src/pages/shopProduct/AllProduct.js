import { useRoute } from '@react-navigation/native';
import { Flex, ScrollView, Spacer } from 'native-base';
import React from 'react';
import Banner from '../../components/Banner/Banner';
import ProductCard from '../../components/ProductCard/ProductCard';
import SizedBox from '../../components/SizeBox/SizeBox';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

const styles = StyleSheet.create({
  root: {
    paddingTop: 46,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    height: '100%'
  },

});
function AllProduct(props) {
  const route = useRoute();
  const list = [1, 2 , 3, 4];
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
      <Flex flexDirection='row' wrap='wrap'>
        {list.map((item) => (
            <ProductCard
              key={item}
              name='FS - Nike Air Max 270 React Native Native Native'
              image={{
                uri: 'https://static.nike.com/a/images/t_default/lvzcsilw4gmh2gi2hiq4/revolution-5-road-running-shoes-szF7CS.png',
              }}
              price={204}
              discountPercent={24}
              discountPrice={300}
            />
        ))}
      </Flex>
      </ScrollView>

    </SafeAreaView>
  );
}

export default AllProduct;
