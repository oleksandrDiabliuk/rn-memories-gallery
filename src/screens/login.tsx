import React, { useState } from "react";
import { AuthErrorCodes } from 'firebase/auth';
import { AuthBackground, LogoWithTitle, BottomSection } from '../components/auth';
import { LoginForm } from '../components/forms';
import { ROUTES } from '../constants'
import { signin } from '../services/auth';
import { errorAlert } from '../services/alert';
import { useAuth, GuestScreenProps } from '../routes';

export const Login = ({navigation}: GuestScreenProps<ROUTES.LOGIN>) => {
  const [loading, setLoading] = useState(false);
  const { handleSetLoggedIn } = useAuth();

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);

    try {
      const user = await signin(email, password);

      setLoading(false);

      if (user?.uid) {
        handleSetLoggedIn();
      }
    } catch(error: any) {
      setLoading(false);
      console.log('error -> ', error)

      if (error.code === AuthErrorCodes.INVALID_EMAIL ||
        error.code === AuthErrorCodes.USER_DELETED ||
        error.code === AuthErrorCodes.INVALID_PASSWORD ||
        error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS
      ) {
        errorAlert('Invalid email or password. Please try again.');
      } else if (error.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
        errorAlert('Too many unsuccessful login attempts. Please try again later.');
      } else {
        errorAlert(`Sign in error: ${error.message}`);
      }
    }
  };

  const handleRegister = () => {
    navigation.navigate(ROUTES.REGISTER);
  };

  return (
    <AuthBackground>
      <LogoWithTitle title="Welcome!" />
      <LoginForm
        loading={loading}
        handleLogin={handleSignIn}
      />
      <BottomSection
        title="Don't have an account?"
        onPress={handleRegister}
        buttonTitle="Create"
      />
    </AuthBackground>
  );
}
