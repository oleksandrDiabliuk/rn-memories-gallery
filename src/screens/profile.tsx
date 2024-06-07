import React, { useEffect, useState } from "react";
import { View, Text } from 'react-native';
import { AuthBackground, LogoWithTitle, BottomSection } from '../components/auth';
import { AuthButton } from '../components/buttons';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from '../services/config';
import { logout } from '../services/auth';
import { ROUTES } from '../constants';
import { errorAlert } from '../services/alert';
import { useAuth, RouteParamsListProps } from '../routes';
import { profile } from '../styles'

export const Profile = ({navigation}: RouteParamsListProps<ROUTES.PROFILE>) => {
  const [email, setEmail] = useState('');
  const { handleSetLoggedOut } = useAuth();

  useEffect(() => {
    onAuthStateChanged(authentication, user => {
      if (user) {
        setEmail(user.email || '');
      }
    });
  }, []);

  const back = () => {
    navigation.goBack();
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleSetLoggedOut();
    } catch(error: any) {
      errorAlert(error?.errorMessage || 'Error');
    }
  };

  return (
    <AuthBackground>
      <LogoWithTitle title="Hello!" />
      <View style={profile.headingContainer}>
        <Text style={profile.heading}>Your e-mail:</Text>
        <View style={profile.headEmailContainer}>
          <Text style={profile.headEmail}>{email}</Text>
        </View>
        <AuthButton
          title="Log out"
          onPress={handleLogout}
        />
      </View>
      <BottomSection
        title=""
        onPress={back}
        buttonTitle="Go Back"
      />
    </AuthBackground>
  );
}
