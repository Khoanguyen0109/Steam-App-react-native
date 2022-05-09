import {Flex, Icon, ScrollView} from 'native-base';
import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import EInput from '../../components/EInput/EInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Banner from '../../components/Banner/Banner';
import SizedBox from '../../components/SizeBox/SizeBox';
import TitleRow from './components/TitleRow';
import Category from './components/Category';
import ProductCard from '../../components/ProductCard/ProductCard';
import {categories} from '../category/utils';
import CategoryList from './CategoryList';
import {AxiosContext} from '../../provider/AxiosProvider';
import {debounce} from 'lodash';
import {IMAGE_ENDPOINT} from '../../utils';

const styles = StyleSheet.create({
  root: {
    paddingTop: 46,
    paddingHorizontal: 16,
    backgroundColor: 'white',

    // marginBottom: 100
    // paddingBottom: 40
  },
});
function Home() {
  const [searchText, setSearchText] = useState();
  const [productList, setProductList] = useState();
  const {publicAxios} = useContext(AxiosContext);
  const getSearchProduct = async name => {
    console.log('name', name)
    try {
      if (name === '') {
        setProductList(null);
      } else {
        const res = await publicAxios.get('/products', {
          params: {
            name: name,
          },
        });
        const data = res.data.data;
        setProductList(data);
      }
    } catch (error) {}
  };
  const onSearch = value => {
    setSearchText(value);
    debounce(() => getSearchProduct(value), 500)();
  };
  return (
    <ScrollView height={'100%'} style={styles.root}>
      <SafeAreaView>
        <EInput
          value={searchText}
          placeHolder="Search Product"
          onChangeText={text => onSearch(text)}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="search" />}
              size={6}
              ml="3"
              color="muted.400"
            />
          }
        />
        <SizedBox height={24} />
        {searchText ? (
          <Flex flexDirection="row" wrap="wrap">
            {productList&& productList?.map(item => (
              <ProductCard
                id={item.id}
                name={item.name}
                image={{
                  uri: `${IMAGE_ENDPOINT}/${item.images[0].name}`,
                }}
                price={item.price}
              />
            ))}
          </Flex>
        ) : (
          <View>
            <View style={{width: 343, height: 206}}>
              <Banner />
            </View>
            <SizedBox height={48} />
            <View>
              <TitleRow title={'Category'} seeMoreLink={'MoreCategory'} />
              <SizedBox height={16} />
              <ScrollView horizontal={true}>
                {categories.map(item => (
                  <Category
                    id={item.id}
                    key={item.label}
                    category={item.label}
                    icon={item.icon()}
                  />
                ))}
              </ScrollView>
            </View>

            {categories.map(item => (
              <CategoryList key={item.id} id={item.id} title={item.label} />
            ))}
          </View>
        )}

        <SizedBox height={48} />
      </SafeAreaView>
    </ScrollView>
  );
}

export default Home;
