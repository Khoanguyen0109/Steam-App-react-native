import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#223263',
    fontSize: 14,
    fontWeight: '700',
  },
  seeMore: {
    color: '#006FBF',
    fontSize: 14,
    fontWeight: '700',
  },
});
function TitleRow(props) {
  const { title, seeMoreLink , options } = props;
  const navigation = useNavigation();

  const onNavigate = () => {
    navigation.navigate(seeMoreLink , {...options});
  };
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      {seeMoreLink && <Text style={styles.seeMore} onPress={() => onNavigate()}> See more</Text>}
    </View>
  );
}

export default TitleRow;
