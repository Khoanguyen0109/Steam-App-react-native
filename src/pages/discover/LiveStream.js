import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {Button, Input, Toast, View} from 'native-base';
import React, {useRef, useEffect, useContext, useState} from 'react';
import {PermissionsAndroid, StyleSheet} from 'react-native';
import {NodeCameraView} from 'react-native-nodemediaclient';
import EButton from '../../components/EButton/Ebutton';
import SizedBox from '../../components/SizeBox/SizeBox';
import {AuthContext} from '../../provider/AuthProvider';
import {AxiosContext} from '../../provider/AxiosProvider';
import CommentView from './CommentView';
import {io} from 'socket.io-client';
import {cloneDeep} from 'lodash';

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
  inputbox: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    bottom: 80,
    padding: 16,
    width: '100%',
    backgroundColor: 'transparent',
  },
  commentView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: 150,
    width: '100%',
  },
});
function LiveStream(props) {
  const isFocues = useIsFocused();

  const route = useRoute();
  const {title, description, streamUrl, streamId} = route.params;
  const navigation = useNavigation();
  const camViewRef = useRef();
  const {publicAxios, authAxios} = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  const {currentUser} = authContext.authState;
  const [start, setStart] = useState(false);
  // const [streamUrl, setStreamUrl] = useState();
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  const socketRef = useRef();
  const initSocket = () => {
    try {
      socketRef.current = io('https://api.ntustreamhub.com', {
        auth: {
          streamId: streamId,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
        },
      });
      //   console.log('socket :>> ', socket);
      console.log(`Connecting socket...`);

      socketRef.current.on('chat message', msg => {
        console.log('msg shop', msg);
        messages.push(msg);
        setMessages(cloneDeep(messages));
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const submitChatMessage = () => {
    socketRef.current.emit('chat message', chatMessage);
    setChatMessage('');
  };
  useEffect(() => {
    initSocket();
    if (isFocues) {
      setMessages([]);
      setChatMessage('');
    }
    return () => {
      socketRef.current.disconnect();
    };
  }, [isFocues]);
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

  const onBack = async () => {
    setStart(false);
    const res = await authAxios.put(`/streams/${streamId}`, {
      isLive: false,
    });
    navigation.navigate('ShopAccount');
    camViewRef.current.stop();
  };

  const createStream = async () => {
    if (!start) {
      camViewRef.current.start();
      setStart(true);
    } else {
      try {
        onBack();
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  console.log('start', start);
  return (
    <View style={styles.root}>
      <NodeCameraView
        style={styles.camView}
        ref={camViewRef}
        outputUrl={streamUrl ?? ''}
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
      <View style={styles.commentView}>
        <CommentView messages={messages} />
      </View>
      {start && (
        <View style={styles.inputbox}>
          <View width={250}>
            <Input
              style={styles.input}
              value={chatMessage}
              placeholder="Add Comment"
              onChangeText={setChatMessage}
            />
          </View>

          <SizedBox width={12} />
          <Button onPress={submitChatMessage}>Send</Button>
        </View>
      )}

      <View style={styles.buttonGroup}>
        <Button style={styles.backButton} onPress={() => navigation.goBack()}>
          Back
        </Button>
        <Button style={styles.live} onPress={createStream}>
          {!start ? 'Live now' : 'Stop Stream'}
        </Button>
        {/* <Button style={styles.live} onPress={()=> camViewRef.current.start()}>
          Publish
        </Button> */}
      </View>
    </View>
  );
}

export default LiveStream;
