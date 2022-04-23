import {useNavigation} from '@react-navigation/native';
import {Divider, Input, Pressable, ScrollView, Text, View} from 'native-base';
import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import EInput from '../../components/EInput/EInput';
import {io} from 'socket.io-client';
import SizedBox from '../../components/SizeBox/SizeBox';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    padding: 16,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  input: {
    width: '100%',
    borderRadius: 50,
  },
  commentList: {
    height: 100,
  },
  name: {
    color: '#FAFFBD',
    fontSize: 16,
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
});
function CommentView(props) {
  const {messages} = props;
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.root}>
      {messages.map(msg => (
        <View
          display="flex"
          flexDirection="row"
          width="full"
          backgroundColor="rgba(22, 22, 22, 0.4)"
          padding={2}
          borderRadius={5}
          marginBottom={2}
          >
          <Text style={styles.name}>
            {msg.firstName} {msg.lastName}:{' '}
          </Text>
          <Text style={styles.name}>{msg.msg} </Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default CommentView;
