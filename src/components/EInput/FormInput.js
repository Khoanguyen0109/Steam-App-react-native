import { View, Text } from 'native-base';
import React from 'react';
import { Controller } from 'react-hook-form';
import ESelect from '../ESelect/ESelect';
import SizedBox from '../SizeBox/SizeBox';
import EInput from './EInput';
import ETextArea from './ETextArea';

const FormInput = ({
  control,
  label,
  name,
  rules = {},
  keyboardType = 'default',
  placeholder,
  secureTextEntry,
  type = 'input',
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          {label && (
            <>
              <Text color='#223263' fontSize={14} fontWeight='700'>
                {label}
              </Text>
              <SizedBox height={12} />
            </>
          )}
          <View>
            {type === 'input' && (
              <EInput
                value={value}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                {...rest}
              />
            )}
            {type === 'select' && (
              <ESelect
                onValueChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                {...rest}
              />
            )}
            {type === 'text-area' && (
              <ETextArea
                onValueChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                {...rest}
              />
            )}
          </View>
          {error && (
            <Text style={{ color: 'red', alignSelf: 'stretch' }}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default FormInput;
