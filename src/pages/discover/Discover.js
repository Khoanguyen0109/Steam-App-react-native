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
import {NodeCameraView} from 'react-native-nodemediaclient';

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

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA],
        {
          title: 'Cool Photo App Camera And Microphone Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      setPermission(true);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getStream = async () => {
    try {
      const res = await authAxios.get(`/stream/${id}`);
      setStreamUrl(res.data.data.playStreamUrl);
    } catch (error) {
      console.log('error :>> ', error);
      Toast.show({description: 'Load Stream failed'});
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);
  useEffect(() => {
    if (permission) {
      getStream();
    }
  }, [permission]);

  return (
    <ScrollView snapToInterval={windowHeight - 100} style={styles.root}>
      <View style={styles.root}>
        <NodeCameraView
          style={styles.camView}
          ref={camViewRef}
          outputUrl={streamUrl}
          camera={{cameraId: 1, cameraFrontMirror: true}}
          audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
          video={{
            preset: 12,
            bitrate: 400000,
            profile: 1,
            fps: 15,
            videoFrontMirror: false,
          }}
          autopreview={true}
        />
      </View>
      <View style={styles.root}>
        <NodeCameraView
          style={styles.camView}
          ref={camViewRef}
          outputUrl={streamUrl}
          camera={{cameraId: 1, cameraFrontMirror: true}}
          audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
          video={{
            preset: 12,
            bitrate: 400000,
            profile: 1,
            fps: 15,
            videoFrontMirror: false,
          }}
          autopreview={true}
        />
      </View>
      <View style={styles.root}>
        <NodeCameraView
          style={styles.camView}
          ref={camViewRef}
          outputUrl={streamUrl}
          camera={{cameraId: 1, cameraFrontMirror: true}}
          audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
          video={{
            preset: 12,
            bitrate: 400000,
            profile: 1,
            fps: 15,
            videoFrontMirror: false,
          }}
          autopreview={true}
        />
      </View>
    </ScrollView>
  );
}

export default Discover;
