import { View } from 'native-base';
import React, { useRef, useEffect } from 'react';
import { PermissionsAndroid, StyleSheet } from 'react-native';
import { NodeCameraView } from 'react-native-nodemediaclient';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
  },
  camView: {
    flex: 8,
    height: '90%',
  },
  buttonGroup: {
    height: '10%',
    backgroundColor: 'black',
  },
  button: {},
  backButton: {},
});
function LiveStream() {
  const camViewRef = useRef();
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          //   PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ],
        {
          title: 'Cool Photo App Camera And Microphone Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
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
  return (
    <View style={styles.root}>
      <NodeCameraView
        ref={camViewRef}
        // outputUrl={'rtmp://192.168.0.10/live/stream'}
        // camera={{ cameraId: 1, cameraFrontMirror: true }}
        // audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
        // video={{
        //   preset: 12,
        //   bitrate: 400000,
        //   profile: 1,
        //   fps: 15,
        //   videoFrontMirror: false,
        // }}
        // autopreview={true}
      />
      <View style={styles.buttonGroup}></View>
    </View>
  );
}

export default LiveStream;
