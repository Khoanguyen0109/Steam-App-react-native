import { Input, TextArea } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
      color: "#9098B1",
      fontSize: 12,
      fontWeight: '400'
    },
    focus: {
      borderColor: "#40BFFF"
    }
  });

function ETextArea(props) {
  return (
    <TextArea h={20} style={styles.root} {...props} _focus={styles.focus}/>
  )
}

export default ETextArea