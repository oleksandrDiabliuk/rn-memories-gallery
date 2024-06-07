import React from "react";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { Login, Register } from '../screens';
import { ROUTES } from '../constants';

type GuestRoutesParamsListProps = {
  login: undefined;
  register: undefined;
};
export type GuestScreenProps <T extends keyof GuestRoutesParamsListProps> = NativeStackScreenProps<GuestRoutesParamsListProps, T>;


const Stack = createNativeStackNavigator<GuestRoutesParamsListProps>();

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
