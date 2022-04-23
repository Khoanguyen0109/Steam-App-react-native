import {useRoute} from '@react-navigation/native';
import {Flex, ScrollView, Spacer} from 'native-base';
import React , {useState , useEffect , useContext } from 'react';
import Banner from '../../components/Banner/Banner';
import ProductCard from '../../components/ProductCard/ProductCard';
import SizedBox from '../../components/SizeBox/SizeBox';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import { AxiosContext } from '../../provider/AxiosProvider';
import { IMAGE_ENDPOINT } from '../../utils';

const styles = StyleSheet.create({
  root: {
    paddingTop: 46,
    paddingHorizontal: 16,
  },
});
function Category(props) {
  const route = useRoute();
  console.log('route.params', route.params)
  const {id} = route.params;
  console.log('object', route.params)
  const {publicAxios} = useContext(AxiosContext);

  const [productList, setProductList] = useState([]);
  const getProduct = async () => {
    try {
      const res = await publicAxios.get('/products', {
        params: {categoryId: id},
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
              uri: `${IMAGE_ENDPOINT}/${item.images[0].name}`
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
