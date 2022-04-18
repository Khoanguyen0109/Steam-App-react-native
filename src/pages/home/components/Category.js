import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    borderColor: '#EBF0FF',
    borderWidth: 3,
    marginRight: 16,
    marginBottom: 16
  },
});
function Category(props) {
  const { icon, category, id } = props;
  console.log('id', id);
  const navigation = useNavigation();
  const onRoute = () => {
    navigation.navigate('Category', { name: category , id: id });
  };
  return <Pressable style={styles.root} onPress={onRoute}>{icon}</Pressable>;
}

export default Category;
