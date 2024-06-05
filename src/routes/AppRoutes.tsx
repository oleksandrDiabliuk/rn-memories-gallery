import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Profile,
  MemoryDetails,
  TagDetails,
} from '../screens';
import { Tabs } from './Tabs';
import { ROUTES } from '../constants';

const Stack = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.TABS}
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name={ROUTES.TABS}
        component={Tabs}
      />
      <Stack.Screen
        name={ROUTES.PROFILE}
        component={Profile}
      />
      <Stack.Screen
        name={ROUTES.MEMORY_DETAILS}
        component={MemoryDetails}
      />
      <Stack.Screen
        name={ROUTES.TAG_DETAILS}
        component={TagDetails}
      />
    </Stack.Navigator>
  );
};

