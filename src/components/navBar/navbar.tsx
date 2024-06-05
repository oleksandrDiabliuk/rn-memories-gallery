import React from "react";
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Touchable } from '../buttons';
import { COLORS } from '../../constants';
import { navbar } from '../../styles'

type Props = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onProfile: () => void;
};

export const NavBar = ({title, showBack, onBack, onProfile}: Props) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
      <LinearGradient style={navbar.container} colors={[COLORS.linearTop, COLORS.purple]}>
        <View style={navbar.wrapper}>
          <View style={navbar.rect} />
          <View style={navbar.rect} />
          <View style={navbar.rect} />
          <View style={navbar.rect} />
          <View style={navbar.titleContainer}>
            <View style={navbar.titleWrapper}>
              <Text style={navbar.title}>{title}</Text>
            </View>
          </View>
          {showBack && (
            <Touchable
              iconName="chevron-left"
              onPress={handleBack}
              iconColor={COLORS.white}
              style={[navbar.iconButton, navbar.iconButtonLeft]}
              size={20}
            />
          )}
          <Touchable
            iconName="user"
            onPress={onProfile}
            iconColor={COLORS.white}
            style={[navbar.iconButton, navbar.iconButtonRight]}
            size={20}
          />
        </View>
      </LinearGradient>
  )
};
