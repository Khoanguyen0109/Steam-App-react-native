import React, {useState, useContext, useEffect} from 'react';
import {Icon, ScrollView, View} from 'native-base';

import SizedBox from '../../components/SizeBox/SizeBox';
import TitleRow from './components/TitleRow';
import ProductCard from '../../components/ProductCard/ProductCard';
import {AuthContext} from '../../provider/AuthProvider';
import {AxiosContext} from '../../provider/AxiosProvider';
import { IMAGE_ENDPOINT } from '../../utils';
function CategoryList(props) {
  const {id, title} = props;
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
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <View>
      <TitleRow
        title={title}
        seeMoreLink={'Category'}
        options={{name: title, id}}
      />
      <SizedBox height={16} />
      <ScrollView horizontal={true}>
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
      </ScrollView>
      <SizedBox height={24} />
    </View>
  );
}

export default CategoryList;
