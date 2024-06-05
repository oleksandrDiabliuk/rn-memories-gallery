import React from "react";
import { View, TextInput, KeyboardTypeOptions } from 'react-native';
import { COLORS } from '../../constants';
import { inputs } from '../../styles';

type Props = {
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  secureTextEntry?: boolean;
  multiline?: boolean;
  value: string;
  onChangeText: (value: string) => void;
};

export const InputText = ({
  placeholder,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
  multiline,
  value,
  onChangeText,
}: Props) => {
  return (
    <TextInput
      placeholder={placeholder}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={COLORS.purple}
      multiline={multiline}
      style={[inputs.textInput, multiline ? inputs.multiline : {}]}
    />
  );
};
