import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Register } from '../screens';
import { ROUTES } from '../constants';

const Stack = createNativeStackNavigator();

export const GuestRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
