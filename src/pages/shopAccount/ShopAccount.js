import {Button, Center, Icon, IconButton, Text, View} from 'native-base';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SizedBox from '../../components/SizeBox/SizeBox';
import EButton from '../../components/EButton/Ebutton';
import CreateProductIcon from '../../../assets/icons/create_product.svg';
import Row from '../account/components/Row';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    // marginBottom: 100
    // paddingBottom: 40
  },
  shopInfo: {
    height: 116,
    backgroundColor: '#006FBF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  uploadButton: {
    backgroundColor: '#978A8F',
    height: 72,
    width: 72,
    borderRadius: 72 / 2,
  },
  shopImage: {
    height: 72,
    width: 72,
    borderRadius: 72 / 2,
  },
  shopName: {
    fontSize: 14,
    color: 'white',
    fontWeight: '700',
  },
  boxButton: {
    width: 163,
    height: 163,
    backgroundColor: '#E8005A',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#223263',
  },
});
function ShopAccount() {
  const navigation = useNavigation();
  const tab = [
    {
      title: 'Shop Profile',
      icon: 'person-outline',
      screen: 'ShopProfile',
    },
    {
      title: 'Order',
      icon: 'shopping-bag',
      screen: 'Order',
    },
    {
      title: 'Revenue',
      icon: 'payment',
      screen: 'Revenue',
    },
  ];

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // console.log(result);
    // if (!result.cancelled) {
    //   setImage(result.uri);
    // }
  };

  return (
    <SafeAreaView>
      <View style={styles.shopInfo}>
        <IconButton
          // onPress={pickImage}
          style={styles.uploadButton}
          icon={
            <Icon
              as={<MaterialIcons name="add-a-photo" />}
              size={8}
              color="black"
            />
          }
        />
        <SizedBox width={12} />
        <Text style={styles.shopName}>Shop name</Text>
      </View>
      <SizedBox height={20} />
      <View style={styles.root}>
        <EButton
          title="Create Live Stream"
          onPress={() => navigation.navigate('LiveStream')}
        />
        <SizedBox height={20} />
        <Text style={styles.title}>Product management</Text>
        <SizedBox height={20} />
        <View display="flex" flexDirection="row" justifyContent="space-between">
          <Button
            style={styles.boxButton}
            onPress={() => navigation.navigate('CreateProduct')}>
            <Center>
              <CreateProductIcon height={40} width={40} />
            </Center>
            <SizedBox height={12} />
            <Text color="white" fontSize={14}>
              Create Product
            </Text>
          </Button>
          <Button
            style={styles.boxButton}
            onPress={() => navigation.navigate('AllProduct')}>
            <Center>
              <CreateProductIcon height={40} width={40} />
            </Center>
            <SizedBox height={12} />
            <Text color="white" fontSize={14}>
              All Product
            </Text>
          </Button>
        </View>
        <SizedBox height={10} />
        {tab.map(item => (
          <Row
            key={item.title}
            title={item.title}
            icon={item.icon}
            screen={item.screen}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

export default ShopAccount;
