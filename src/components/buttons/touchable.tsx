import React from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {
  title?: string;
  onPress: (value?: any) => void;
  value?: any;
  disabled?: boolean;
  iconName?: string;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  size?: number;
};

export const Touchable = ({
  title,
  onPress,
  value,
  disabled,
  iconName,
  style,
  titleStyle,
  iconColor,
  size,
}: Props) => {
  const handlePress = () => {
    onPress(value);
  };

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled} style={style}>
      {iconName ? <Icon name={iconName} size={size} color={iconColor} /> : <Text style={titleStyle}>{title}</Text>}
    </TouchableOpacity>
  );
};
