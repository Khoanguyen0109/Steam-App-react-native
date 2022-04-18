import {Icon, ScrollView} from 'native-base';
import React, {useState} from 'react';
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
  const category = [];
  const [productList, setProductList] = useState([]);
  return (
    <ScrollView height={'100%'} style={styles.root}>
      <SafeAreaView>
        <EInput
          placeHolder="Search Product"
          onChangeText={setSearchText}
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
        <View style={{width: 343, height: 206}}>
          <Banner />
        </View>
        <SizedBox height={48} />
        <View>
          <TitleRow title={'Category'} seeMoreLink={'MoreCategory'} options={id} />
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

        <SizedBox height={48} />
      </SafeAreaView>
    </ScrollView>
  );
}

export default Home;
