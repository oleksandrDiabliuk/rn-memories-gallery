import React, { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { InputText } from '../auth';
import { AuthButton } from '../buttons';
import { auth } from '../../styles';

type Props = {
  loading: boolean;
  handleLogin: (email: string, password: string) => void;
};

export const LoginForm = ({loading, handleLogin}: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    handleLogin(email, password);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={auth.formView}>
      <View style={auth.authFormContainer}>
        <View>
          <InputText
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <InputText
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <AuthButton
          title="Login"
          disabled={loading}
          onPress={handleSignIn}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
