import { ScrollView } from 'native-base';
import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import Layout from '../../layout/Layout';
import CategoryRow from './CategoryRow';
import ShirtIcon from '../../../assets/icons/shirt.svg';
import { categories } from './utils';
const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    paddingHorizontal: 16
  },
});
function MoreCategory() {
  return (
    // <SafeAreaView>
    <ScrollView style={styles.root}>
      {categories.map((item) => (
        <CategoryRow id={item.id} title={item.label} icon={item.icon()} />
      ))}
    </ScrollView>

    // </SafeAreaView>
  );
}

export default MoreCategory;
