import {useNavigation} from '@react-navigation/native';
import {Image, Text, View} from 'native-base';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { AuthContext } from '../../provider/AuthProvider';
import SizedBox from '../SizeBox/SizeBox';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: 165,
    height: 215,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    marginRight: 13,
    marginTop: 13,
  },

  containerImage: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    width: 113,
    height: 113,
    borderRadius: 5,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
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
  discountPrice: {
    fontSize: 10,
    color: '#9098B1',
    textDecorationLine: 'line-through',
  },
  percentDiscount: {
    color: 'red',
    fontSize: 10,
    fontWeight: '700',
  },
});
function ProductCard(props) {
  const {id, image, name, price, discountPrice, percentDiscount} = props;
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const isShop = authContext?.authState?.isShop;
  const onRoute = () => {
    if (isShop) {
      navigation.navigate('CreateProduct', {name: name, id});
    } else {    navigation.navigate('ProductDetail', {name: name, id});

    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        onRoute();
      }}>
      <View style={styles.root}>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={image} alt="image" />
        </View>
        <SizedBox height={8} />
        <View style={styles.container}>
          <Text ful style={styles.name} ellipsizeMode="tail" numberOfLines={2}>
            {name}
          </Text>
          <SizedBox height={8} />
          <Text style={styles.price}>${price}</Text>
          <SizedBox height={8} />
          {discountPrice && (
            <Text style={styles.discountPrice}>
              ${discountPrice}
              <SizedBox width={8} />
              <Text style={styles.percentDiscount}>{percentDiscount}% Off</Text>
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ProductCard;
