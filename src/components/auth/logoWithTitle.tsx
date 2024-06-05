import React from "react";
import { View, Text } from 'react-native';
import { auth } from '../../styles';

type Props = {
  title: string;
};

export const LogoWithTitle = ({title}: Props) => {
  return (
    <View style={auth.logoContainer}>
      <View style={auth.logoWrapper}>
        <Text style={auth.logoLetter}>M</Text>
        <Text style={[auth.logoLetter, auth.logoLetterBottom]}>G</Text>
      </View>
      <Text style={auth.title}>{title}</Text>
    </View>
  );
};