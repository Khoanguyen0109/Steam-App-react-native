import {Icon, IconButton, Text, View} from 'native-base';
import React, {useContext, useEffect} from 'react';
import Layout from '../../layout/Layout';
import Row from './components/Row';
import {StyleSheet, SafeAreaView} from 'react-native';
import {GENDER} from './utils';
import EButton from '../../components/EButton/Ebutton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SizedBox from '../../components/SizeBox/SizeBox';
import {AuthContext} from '../../provider/AuthProvider';
import {useIsFocused} from '@react-navigation/native';
import {AxiosContext} from '../../provider/AxiosProvider';
import AccountDefail from '../../../assets/icons/defaultImg.svg';
const styles = StyleSheet.create({
  root: {
    height: '80%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    // marginBottom: 100
    // paddingBottom: 40
  },
  info: {
    height: 116,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  uploadButton: {
    height: 72,
    width: 72,
    borderRadius: 72 / 2,
    backgroundColor: 'gray'
  },
  name: {
    fontSize: 14,
    color: '#006FBF',
    fontWeight: '700',
  },
});

function Profile(props) {
  const isFoucsed = useIsFocused();
  const authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);
  const {authState} = authContext;
  const renderGender = () => {};
  const isShop = authState.isShop;
  const url = isShop ? '/shops/me' : '/users/me';
  console.log('first', authState?.currentUser?.gender);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePickrrer.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // console.log(result);
    // if (!result.cancelled) {
    //   setImage(result.uri);
    // }
  };
  const getUser = async () => {
    try {
      const res = await authAxios.get(url);
      const data = res.data.data;
      authContext.setAuthState({
        ...authContext.authState,
        currentUser: data || null,
      });
      console.log('data', data);
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, [isFoucsed]);
  const onSignOut = () => {
    authContext.logout();
  };
  const name = `${authState?.currentUser?.firstName} ${authState?.currentUser?.lastName} `;
  return (
    <SafeAreaView>
      <View style={styles.info}>
        <View style={styles.uploadButton}>
          {/* <AccountDefail size={30} /> */}
        </View>
        {/* <IconButton
          onPress={pickImage}
          icon={
            <Icon
              as={<MaterialIcons name="add-a-photo" />}
              size={8}
              color="white"
            />
          }
        /> */}
        <SizedBox width={12} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <SizedBox width={12} />

      <View style={styles.root}>
        <View>
          <Row
            icon="person-outline"
            title="Name"
            value={name}
            screen={'Name'}
          />
          {!isShop && (
            <Row
              icon={'person'}
              title="Gender"
              value={GENDER[authState?.currentUser?.gender]}
              screen={'Gender'}
            />
          )}
          <Row
            icon="email"
            title="Email"
            value={authState?.currentUser?.email}
            screen="Email"
          />
        </View>
        <EButton title="Sign out" onPress={onSignOut} />
      </View>
    </SafeAreaView>
  );
}

export default Profile;
