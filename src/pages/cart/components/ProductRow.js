import { IconButton, Image, Text, View , Icon } from 'native-base';
import React  , {useState , useEffect} from 'react';
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
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
 
  },
  image: {
    width: '100%',
    height: 72,
    flex: 1,
    resizeMode: 'contain',
    backgroundColor: 'white'
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
  const { product, onRemoveProduct , updateCartItem, cartItemId, name , price , image  } = props;
  const [quantity, setQuantity] = useState(props.quantity);
  const onAdd = () => {
    // if(quantity  ){
    setQuantity(quantity+1);
  };
  const onRemove = () => {

 
    return setQuantity(quantity -1);
  };

  useEffect(()=>{
    if (quantity === 0) {
      onRemoveProduct(cartItemId);
    }
  },[quantity])

  useEffect(() => {
    
    updateCartItem(cartItemId, quantity)
  }, [quantity])
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
              ${price}
          </Text>
      </View>
      <SizedBox width={12}/>

      <View style={styles.action}>
      <IconButton
        onPress={() => onRemoveProduct(cartItemId)}
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
