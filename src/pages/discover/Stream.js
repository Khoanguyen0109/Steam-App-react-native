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
import {io} from 'socket.io-client';
import SizedBox from '../../components/SizeBox/SizeBox';
import {NodePlayerView} from 'react-native-nodemediaclient';
import CommentView from './CommentView';
import {AuthContext} from '../../provider/AuthProvider';
import {Dimensions} from 'react-native';
import {cloneDeep} from 'lodash';

const windowHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
    flexGrow: 1,
    height: windowHeight - 90,
  },
  camView: {
    height: '100%',
    flexGrow: 1,
  },
  boxtitle: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
  commentView: {
    position: 'absolute',
    bottom: 130,
    width: '100%',
  },
  inputbox: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    bottom: 50,
    padding: 16,
    width: '100%',
    backgroundColor: 'transparent',
  },
  buttonGroup: {
    height: 50,
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    width: 200,
  },
  title: {
    color: 'white',
    fontSize: 15,
  },
});
function Stream(props) {
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
      console.log('socketRef', socketRef.current)
      socketRef.current.on('chat message', msg => {
        console.log('msg', msg)
        messages.push(msg)
       setMessages( cloneDeep(messages));
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
    if(isFocues){
      setMessages([])
      setChatMessage('')
    }
    return () => {
      socketRef.current.disconnect();
    };
  }, [isFocues]);
  const shopName =`@${props?.shop?.firstName.toLowerCase()}${props?.shop?.lastName.toLowerCase()}`
  return (
    <View style={styles.root}>
      <NodePlayerView
        key={props.id}
        style={styles.camView}
        inputUrl={props.playStreamUrl}
        scaleMode={'ScaleToFill'}
        bufferTime={300}
        maxBufferTime={1000}
        autoplay={true}
      />
      <View style={styles.boxtitle}>
      <Text style={styles.title}>{shopName}</Text>

        <Text style={styles.title}>{props?.title}</Text>
        <Text style={styles.title}>{props?.description}</Text>

      </View>
      <View style={styles.commentView}>
        <CommentView messages={messages} />
      </View>

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
      <View style={styles.buttonGroup}>
      <Button  onPress={() => navigation.goBack()}>
          Back
        </Button>
        <Button style={styles.live} onPress={()=>{}}>
          asdasds
        </Button>
      </View>
    </View>
  );
}

export default Stream;
