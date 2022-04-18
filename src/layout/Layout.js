import { ScrollView, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    height: '100%',
    paddingTop: 46,
    paddingHorizontal: 16,
    backgroundColor: 'white',

    // marginBottom: 100
    // paddingBottom: 40
  },
});
function Layout(props) {
  return <ScrollView style={styles.root}>{props.children}</ScrollView>;
}

export default Layout;
