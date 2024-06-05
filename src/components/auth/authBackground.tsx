import React, { PropsWithChildren } from "react";
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../constants';
import { auth } from '../../styles/';

export const AuthBackground = ({children}: PropsWithChildren) => {
  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
      locations={[0,0.5]}
      colors={[COLORS.linearTop, COLORS.purple]}
      style={auth.linearContainer}
    >
      {children}
    </LinearGradient>
  );
};
