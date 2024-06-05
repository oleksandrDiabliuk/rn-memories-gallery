import React from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle, ActivityIndicator } from "react-native";
import { COLORS } from '../../constants';
import { buttons } from '../../styles';

type Props = {
  title: string;
  onPress: (value?: any) => void;
  value?: any;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const AuthButton = ({title, onPress, value, disabled, style}: Props) => {
  const handlePress = () => {
    onPress(value);
  };

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled} style={[buttons.authButton, style, {opacity: disabled ? 0.4 : 1}]}>
      <Text style={buttons.authButtonTitle}>{title}</Text>
      {disabled && (
        <ActivityIndicator size={10} color={COLORS.purple} style={buttons.activityIndicator} />
      )}
    </TouchableOpacity>
  );
};
