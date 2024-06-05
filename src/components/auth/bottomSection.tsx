import React from "react";
import { View, Text } from 'react-native';
import { AuthButton } from '../buttons';
import { auth } from '../../styles';

type Props = {
  title: string;
  onPress: () => void;
  buttonTitle: string;
};

export const BottomSection = ({title, onPress, buttonTitle}: Props) => {
  return (
    <View style={auth.bottomSection}>
      <Text style={auth.bottomText}>{title}</Text>
      <AuthButton
        title={buttonTitle}
        onPress={onPress}
      />
    </View>
  );
};
