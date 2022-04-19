import { IconButton, Image, Text, View , Icon } from 'native-base';
import React  , {useState} from 'react';
import { StyleSheet } from 'react-native';
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import SizedBox from '../../../components/SizeBox/SizeBox';
import ActionButton from './ActionButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',

    position: 'relative',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 104,
    padding:  16,
    borderColor: '#EBF0FF',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#EAEAEA',
 
  },
  image: {
    width: 72,
    height: 72,
    flex: 1,
    resizeMode: 'contain',
  },
  content: {
    flex: 2,
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
  action: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingBottom: 50
  },
  quantityAction: {
      position: 'absolute',
      right: 16,
      bottom: 16
  },
});
function ProductRow(props) {
  const { product, onRemoveProduct , name , price , image  } = props;
  const [quantity, setQuantity] = useState(props.quantity);
  const onAdd = () => {
    // if(quantity  ){
    setQuantity(quantity++);
  };
  const onRemove = () => {
    if (quantity <= 1) {
      return onRemoveProduct();
    }
    return setQuantity(quantity--);
  };
  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} alt='image' />
      </View>
      <SizedBox width={12}/>
      <View style={styles.content}>
          <Text style={styles.name}>
              {name}
          </Text>
          <SizedBox height={18}/>
          <Text style={styles.price}>
              {price}
          </Text>
      </View>
      <SizedBox width={12}/>

      <View style={styles.action}>
      <IconButton
        onPress={onRemove}
        icon={
          <Icon
            as={<MaterialIcons name='delete-outline' />}
            size={7}
            color='muted.400'
          />
        }
      />
      </View>
      <View style={styles.quantityAction}>
        <ActionButton onAdd={onAdd} onRemove={onRemove} quantity={quantity} />
      </View>
    </View>
  );
}

export default ProductRow;
