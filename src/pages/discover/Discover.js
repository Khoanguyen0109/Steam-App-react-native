import {Text, Toast, View} from 'native-base';
import React, {useState, useEffect, useContext, useRef} from 'react';
import {AuthContext} from '../../provider/AuthProvider';
import {AxiosContext} from '../../provider/AxiosProvider';
import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;

import {
  PermissionsAndroid,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {NodePlayerView} from 'react-native-nodemediaclient';
import SizedBox from '../../components/SizeBox/SizeBox';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // flexGrow: 1,
    height: 700,
  },
  camView: {
    flexGrow: 1,
  },
});

function Discover(props) {
  const id = 1;
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
      console.log('data', data)
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
  }, []);

  return (
    <ScrollView snapToInterval={windowHeight - 100} style={styles.root}>
      {streamList.map(item => (
        <>
        <View style={styles.root}>
          <NodePlayerView
            key={item.id}
            style={styles.camView}
            ref={camViewRef}
            inputUrl={item.playStreamUrl}
            scaleMode={'ScaleAspectFit'}
            bufferTime={300}
            maxBufferTime={1000}
            autoplay={true}
          />
        </View>
        <SizedBox height={20}/>
        </>

       ))}
    </ScrollView>
  );
}

export default Discover;
