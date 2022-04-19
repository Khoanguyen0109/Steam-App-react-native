import { Icon, IconButton, View, Text, Pressable } from 'native-base';
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
  const { selected, onSelect,  id, name, description, phone, onEdit, onRemoveAddress } = props;
  return (
    <Pressable onPress={onSelect}>

    <View style={styles.root} borderColor={selected? '#40BFFF' : '#EBF0FF' }>
      <Text style={styles.name}>{name}</Text>
      <SizedBox height={16} />
      <Text style={styles.description}>
        {description}
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
        {onRemoveAddress && (
          <IconButton
            onPress={onRemoveAddress}
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
    </Pressable>

  );
}

export default Address;
