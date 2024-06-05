import React, { PropsWithChildren } from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {
  onPress: (value?: any) => void;
  value?: any;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Button = ({
  onPress,
  value,
  disabled,
  style,
  children,
}: Props & PropsWithChildren) => {
  const handlePress = () => {
    onPress(value);
  };

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled} style={style}>
      {children}
    </TouchableOpacity>
  );
};
