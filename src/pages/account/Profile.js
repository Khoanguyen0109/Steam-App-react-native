import {Icon, IconButton, Text, View} from 'native-base';
import React, {useContext} from 'react';
import Layout from '../../layout/Layout';
import Row from './components/Row';
import {StyleSheet, SafeAreaView} from 'react-native';
import {GENDER} from './utils';
import EButton from '../../components/EButton/Ebutton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SizedBox from '../../components/SizeBox/SizeBox';
import {AuthContext} from '../../provider/AuthProvider';

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
    backgroundColor: '#E8005A',
    color: 'white',
    height: 72,
    width: 72,
    borderRadius: 72 / 2,
  },
  name: {
    fontSize: 14,
    color: '#006FBF',
    fontWeight: '700',
  },
});

function Profile(props) {
  const profile = {
    name: 'Martin',
    email: 'martin@gmail.com',
    gender: 1,
  };
  const authContext = useContext(AuthContext);
  const renderGender = () => {};
  const isShop = false;
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
  const onSignOut = () =>{
    authContext.logout()
  }
  return (
    <SafeAreaView>
      <View style={styles.info}>
        <IconButton
          onPress={pickImage}
          style={styles.uploadButton}
          icon={
            <Icon
              as={<MaterialIcons name="add-a-photo" />}
              size={8}
              color="white"
            />
          }
        />
        <SizedBox width={12} />
        <Text style={styles.name}>Shop name</Text>
      </View>
      <SizedBox width={12} />

      <View style={styles.root}>
        <View>
          <Row icon="person-outline" title="Name" value={profile.name} />
          <Row icon={'person'} title="Gender" value={GENDER[profile.gender]} />
          <Row icon="email" title="Email" value={profile.email} />
        </View>
        <EButton title="Sign out" onPress={onSignOut} />
      </View>
    </SafeAreaView>
  );
}

export default Profile;
