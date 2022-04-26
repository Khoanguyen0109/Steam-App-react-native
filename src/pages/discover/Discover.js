import {Input, Text, Toast, View} from 'native-base';
import React, {useState, useEffect, useContext, useRef} from 'react';
import {AuthContext} from '../../provider/AuthProvider';
import {AxiosContext} from '../../provider/AxiosProvider';
import {Dimensions} from 'react-native';
import {io} from 'socket.io-client';

import {
  PermissionsAndroid,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Stream from './Stream';
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
      height:windowHeight,
    flex: 1,
    position: 'relative',
    // flexGrow: 1,
  },


});

let socket;

function Discover(props) {
  // const id = 1;
  const isFocused = useIsFocused();
  const [streamUrl, setStreamUrl] = useState();
  const [permission, setPermission] = useState(false);
  const authContext = useContext(AuthContext);
  const {publicAxios, authAxios} = useContext(AxiosContext);
  const camViewRef = useRef();
  const [streamList, setStreamList] = useState([]);

  const getStream = async () => {
    try {
      const res = await authAxios.get(`/stream/${id}`);
      setStreamUrl(res.data.data.playStreamUrl);
    } catch (error) {
      console.log('error :>> ', error);
      Toast.show({description: 'Load Stream failed'});
    }
  };

  const getStreamList = async () => {
    try {
      const res = await publicAxios.get(`/streams?isLive=true`);
      const data = res.data.data;
      console.log('data', data);
      setStreamList(data);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  // useEffect(() => {
  //   requestCameraPermission();
  // }, []);
  useEffect(() => {
    getStreamList();

  }, [isFocused]);


  return (
    <ScrollView snapToInterval={windowHeight} style={styles.root}>
      {streamList.map(item => (
        <>
          <Stream {...item} />
        </>
      ))}
    </ScrollView>
  );
}

export default Discover;
