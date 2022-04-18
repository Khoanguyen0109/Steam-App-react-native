import { Pressable, View, Text } from 'native-base';
import React from 'react';
import { SvgUri } from 'react-native-svg';

import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SizedBox from '../../components/SizeBox/SizeBox';
// import ShirtIcon from '../../../assets/icons/shirt.svg';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  icon: {},
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#223263',
  },
});
function CategoryRow(props) {
  const { title, icon } = props;
  const navigation = useNavigation();
  const ouRoute = () => {
    navigation.navigate('Category', { name: title });
  };
  return (
    <Pressable style={styles.root} onPress={() => ouRoute()}>
      {icon}
      <SizedBox width={16} />
      <Text style={styles.name}>{title}</Text>
    </Pressable>
  );
}

export default CategoryRow;
