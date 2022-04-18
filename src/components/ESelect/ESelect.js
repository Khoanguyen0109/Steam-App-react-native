import { Input, Select } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    color: '#9098B1',
    fontSize: 12,
    fontWeight: '400',
  },
  focus: {
    borderColor: '#40BFFF',
  },
});

function ESelect(props) {
  const { items = [] } = props;
  return (
    <Select style={styles.root} {...props} _focus={styles.focus}>
      {items.map((item) => (
        <Select.Item label={item.label} value={item.value} />
      ))}
    </Select>
  );
}

export default ESelect;
