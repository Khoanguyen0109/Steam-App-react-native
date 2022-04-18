import { Center, Icon, IconButton, View, Text } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';;
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    borderColor: '#EBF0FF',
    borderWidth: 1,
    height: 12,
  },
  button: {
      height: 24
  }
});
function ActionButton(props) {
  const { onAdd, onRemove, quantity } = props;
  return (
    <View display='flex' flexDirection='row'>
      <IconButton
        style={styles.button}
        onPress={onRemove}
        icon={
          <Icon
            as={<MaterialIcons name='remove' />}
            size={3}
            color='muted.400'
          />
        }
      />
      <Center width={10} backgroundColor='#EBF0FF'>
        <Text fontSize={12} color='#223263'>
          {quantity}
        </Text>
      </Center>
      <IconButton
        style={styles.button}
        onPress={onAdd}
        icon={
          <Icon as={<MaterialIcons name='add' />} size={4} color='muted.400' />
        }
      />
    </View>
  );
}

export default ActionButton;
