import { Icon, Text, View } from 'native-base';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import SizedBox from '../../../components/SizeBox/SizeBox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    width: '100%',
    paddingHorizontal: 8,
  },
  hover: {
    backgroundColor: '#EBF0FF',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#223263',
  },
  value: {
    fontSize: 12,
    color: '#9098B1',
  },
});
function Row(props) {
  const navigation = useNavigation();
  const { icon, title, screen, value } = props;
  const onRoute = (route) => {
    if(screen){
      navigation.navigate(screen);

    }
  };
  return (
    <Pressable
      style={styles.root}
      _hover={styles.hover}
      onPress={() => onRoute(title)}
    >
      <View display='flex' flexDirection='row' alignItems='center'>
        <Icon as={<MaterialIcons name={icon} />} size={7} color='#006FBF' />
        <SizedBox width={16} />
        <Text style={styles.name}>{title}</Text>
      </View>
      {value && (
        <View display='flex' flexDirection='row' alignItems='center' justifyContent='flex-end'>
          <Text style={styles.value}>{value}</Text>
          <SizedBox width={25}/>
          <Icon as={<MaterialIcons name={'navigate-next'} />} size={7} color='muted.400' />

        </View>
      )}
    </Pressable>
  );
}

export default Row;
