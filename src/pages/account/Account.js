import { useNavigation } from '@react-navigation/native';
import { View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Row from './components/Row';

const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: 'white',

    // marginBottom: 100
    // paddingBottom: 40
  },
});
function Account() {
  const navigation = useNavigation();
  const tab = [
    {
      title: 'Profile',
      icon: 'person-outline',
      screen: 'Profile',
    },
    {
      title: 'Order',
      icon: 'shopping-bag',
      screen: 'Order',
    },
    {
      title: 'Location',
      icon: 'location-on',
      screen: 'Location',
    },
    {
      title: 'Payment',
      icon: 'payment',
      screen: 'Payment',
    },
  ];

  return (
    <View style={styles.root}>
      {tab.map((item) => (
        <Row title={item.title} icon={item.icon} screen={item.screen} />
      ))}
    </View>
  );
}

export default Account;
