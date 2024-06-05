import React, { useState } from "react";
import { KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthErrorCodes } from 'firebase/auth'
import { AuthBackground, LogoWithTitle, BottomSection } from '../components/auth';
import { RegistrationForm } from '../components/forms';
import { signup } from '../services/auth';
import { errorAlert } from '../services/alert';
import { ROUTES } from '../constants';
import { useAuth } from '../routes/AuthContext';

export const Register = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleSetLoggedIn } = useAuth();

  const handleSignUp = async () => {
    setLoading(true);

    try {
      const user = await signup(email, password);

      setLoading(false);

      if (user) {
        handleSetLoggedIn();
      }
    } catch(error: any) {
      setLoading(false);

      if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
        errorAlert('Email already in use. Please choose a different email.');
      } else if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
        errorAlert('Week password. Please choose a stronger password.');
      } else {
        errorAlert(`Sign up error: ${error.message}`);
      }
    }
  };

  const handleLogin = () => {
    navigation.goBack();
  };

  return (
    <AuthBackground>
      <LogoWithTitle title="Registration!" />
      <RegistrationForm
        loading={loading}
        handleLogin={handleSignUp}
      />
      <BottomSection
        title="Already have an account? Login here"
        onPress={handleLogin}
        buttonTitle="Log in"
      />
    </AuthBackground>
  );
}
