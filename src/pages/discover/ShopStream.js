import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  Button,
  Divider,
  Input,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'native-base';
import React, {useContext, useState, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import EInput from '../../components/EInput/EInput';
import {io} from 'socket.io-client';
import SizedBox from '../../components/SizeBox/SizeBox';
import {NodePlayerView} from 'react-native-nodemediaclient';
import CommentView from './CommentView';
import {AuthContext} from '../../provider/AuthProvider';
import {Dimensions} from 'react-native';

const windowHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  root: {
      position: 'relative',
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
  boxtitle: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
  inputbox: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    bottom: 0,
    padding: 16,
    width: '100%',
    backgroundColor: 'transparent',
  },
  input: {
    width: 200,
  },
  title: {
    color: 'white',
    fontSize: 15,
  },
});
function ShopStream(props) {
  const isFocues = useIsFocused();
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  const authContext = useContext(AuthContext);
  const {currentUser} = authContext.authState;
  const socketRef = useRef();

  const initSocket = () => {
    try {
      socketRef.current = io('https://api.ntustreamhub.com', {
        auth: {
          streamId: props.id,
          firstName: currentUser?.firstName,
          lastName: currentUser?.lastName,
        },
      });
      //   console.log('socket :>> ', socket);
      console.log(`Connecting socket...`);

      socketRef.current.on('chat message', msg => {
        console.log('msg', msg);
        setMessages([...messages, msg]);
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const submitChatMessage = () => {
    console.log('object', chatMessage);
    socketRef.current.emit('chat message', chatMessage);
    setChatMessage('');
  };
  useEffect(() => {
    initSocket();
    return () => {
      socketRef.current.disconnect();
    };
  }, [isFocues]);
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
      <View style={styles.buttonGroup}>
        <Button style={styles.backButton} onPress={() => navigation.goBack()}>
          Back
        </Button>
        <Button style={styles.live} onPress={createStream}>
          {!streamUrl ? 'Live now' : 'Stop Stream'}
        </Button>
      </View>
      <View style={styles.boxtitle}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.title}>{props.title}</Text>
      </View>

      <CommentView messages={messages} />

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
    </View>
  );
}

export default ShopStream;
