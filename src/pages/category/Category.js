import {useRoute} from '@react-navigation/native';
import {Flex, ScrollView, Spacer} from 'native-base';
import React , {useState , useEffect , useContext } from 'react';
import Banner from '../../components/Banner/Banner';
import ProductCard from '../../components/ProductCard/ProductCard';
import SizedBox from '../../components/SizeBox/SizeBox';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import { AxiosContext } from '../../provider/AxiosProvider';

const styles = StyleSheet.create({
  root: {
    paddingTop: 46,
    paddingHorizontal: 16,
  },
});
function Category(props) {
  const route = useRoute();
  const {itemId} = route.params;
  console.log('object', route.params)
  const {publicAxios} = useContext(AxiosContext);

  const [productList, setProductList] = useState([]);
  const getProduct = async () => {
    try {
      const res = await publicAxios.get('/products', {
        params: {categoryId: itemId},
      });
      setProductList(res.data.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  console.log('productList', productList);
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
        <View style={{width: 343, height: 206}}>
          <Banner />
        </View>
        <SizedBox height={32} />
        <Flex flexDirection="row" wrap="wrap">
          {productList.map(item => (
            <ProductCard
              id={item.id}
              name={item.name}
              image={{
                uri: 'https://static.nike.com/a/images/t_default/lvzcsilw4gmh2gi2hiq4/revolution-5-road-running-shoes-szF7CS.png',
              }}
              price={item.price}
              // discountPercent={24}
              // discountPrice={300}
            />
          ))}
        </Flex>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Category;
