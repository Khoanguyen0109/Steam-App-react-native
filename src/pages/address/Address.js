import { Icon, IconButton, View, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import EButton from '../../components/EButton/Ebutton';
import SizedBox from '../../components/SizeBox/SizeBox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';;
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderColor: '#EBF0FF',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#223263',
  },
  description: {
    color: '#9098B1',
    fontSize: 12,
  },
});
function Address(props) {
  const navigation = useNavigation();
  const { id, name, description, phone, onEdit, onRemove } = props;
  return (
    <View style={styles.root}>
      <Text style={styles.name}>Priscekila</Text>
      <SizedBox height={16} />
      <Text style={styles.description}>
        3711 Spring Hill Rd undefined Tallahassee, Nevada 52874 United States
      </Text>
      <SizedBox height={16} />
      <Text style={styles.description}>{phone}</Text>
      <SizedBox height={16} />
      <View display='flex' flexDirection='row'>
        {onEdit && (
          <EButton
            width={57}
            title='Edit'
            onPress={() => {
              navigation.navigate('CreateAddress', { id: id });
            }}
          />
        )}
        <SizedBox width={30} />
        {onRemove && (
          <IconButton
            onPress={onRemove}
            icon={
              <Icon
                as={<MaterialIcons name='delete-outline' />}
                size={7}
                color='muted.400'
              />
            }
          />
        )}
      </View>
    </View>
  );
}

export default Address;
