import { useRoute } from '@react-navigation/native';
import { Flex, ScrollView, Spacer } from 'native-base';
import Banner from '../../components/Banner/Banner';
import ProductCard from '../../components/ProductCard/ProductCard';
import SizedBox from '../../components/SizeBox/SizeBox';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import { AxiosContext } from '../../provider/AxiosProvider';
import { AuthContext } from '../../provider/AuthProvider';
import { IMAGE_ENDPOINT } from '../../utils';

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
  const authContext = useContext(AuthContext)
  const {currentUser} = authContext.authState
  const {publicAxios} = useContext(AxiosContext)
  const [productList, setProductList] = useState([])
  const getAllProduct = async() => {
    try {
      const res = await publicAxios.get('products' , {
        params: {
          shopId:currentUser.id
        }
      })
      const data= res.data.data;
      setProductList(data)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getAllProduct()
  },[])
  
  return (
    <SafeAreaView style={styles.root}>
      <ScrollView>
      <Flex flexDirection='row' wrap='wrap'>
        {productList.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              image={{
                uri: `${IMAGE_ENDPOINT}/${item.images[0].name}`
              }}
              price={item.price}
            />
        ))}
      </Flex>
      </ScrollView>

    </SafeAreaView>
  );
}

export default AllProduct;
