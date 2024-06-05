import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from './src/services/config';

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider, useAuth, GuestRoutes, AppRoutes } from "./src/routes";

const AppContent = () => {
  const { loggedInUser, handleSetLoggedIn, handleSetLoggedOut } = useAuth();

  useEffect(() => {
    onAuthStateChanged(authentication, user => {
      if (user) {
        user.getIdToken(true)
        .then(() => {
          handleSetLoggedIn();
        })
        .catch(() => {
          handleSetLoggedOut();
        });
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {loggedInUser ? <AppRoutes /> : <GuestRoutes />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}