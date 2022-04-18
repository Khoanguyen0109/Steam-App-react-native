import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Toast, View} from 'native-base';
import React, {useRef, useEffect, useContext, useState} from 'react';
import {PermissionsAndroid, StyleSheet} from 'react-native';
import {NodeCameraView} from 'react-native-nodemediaclient';
import EButton from '../../components/EButton/Ebutton';
import SizedBox from '../../components/SizeBox/SizeBox';
import {AuthContext} from '../../provider/AuthProvider';
import {AxiosContext} from '../../provider/AxiosProvider';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
  },
  camView: {
    flex: 8,
    height: '80%',
  },
  buttonGroup: {
    height: '10%',
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: 165,
    height: 40,
  },
  backButton: {
    backgroundColor: 'black',
    borderColor: '#E1EA2B',
    color: '#E1EA2B',
    borderWidth: 1,
    width: 165,
    height: 40,
  },
  live: {
    backgroundColor: '#E8005A',
    color: 'white',
    width: 165,
    height: 40,
  },
});
function LiveStream(props) {
  const route = useRoute();
  const {title, description} = route.params;
  const navigation = useNavigation();
  const camViewRef = useRef();
  const {publicAxios, authAxios} = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  const [streamUrl, setStreamUrl] = useState();
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ],
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
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const onBack = () => {
    setStreamUrl(null);
    navigation.goBack();
  };
  const createStream = async () => {
    if (!streamUrl) {
      try {
        const res = await authAxios.post('streams', {
          title: 'title',
          description: 'desc',
        });
        setStreamUrl(res.data.data.pushStreamUrl)
      } catch (error) {
        Toast.show({description: 'Create Live stream failed'});
      }
    } else {
      onBack();
    }
  };
  console.log('streamUrl', streamUrl)
  return (
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
      <View style={styles.buttonGroup}>
        <Button style={styles.backButton} onPress={() => navigation.goBack()}>
          Back
        </Button>
        <Button style={styles.live} onPress={createStream}>
          {!streamUrl ? 'Live now' : 'Stop Stream'}
        </Button>
      </View>
    </View>
  );
}

export default LiveStream;
