import React from "react";
import type { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  Profile,
  MemoryDetails,
  TagDetails,
} from '../screens';
import { Tabs } from './Tabs';
import { ROUTES } from '../constants';
import { Memory, Tag } from '../types';

export type AppRoutesParamsListProps = {
  tabs: undefined;
  profile: undefined;
  memoryDetails: {memory: Memory};
  tagDetails: {tag: Tag};
  home: undefined;
  addNewMemory: undefined;
  explore: undefined;
};

type ScreenProps <T extends keyof AppRoutesParamsListProps> = NativeStackScreenProps<AppRoutesParamsListProps, T>
type TabsProps <T extends keyof AppRoutesParamsListProps> = BottomTabScreenProps<AppRoutesParamsListProps, T>

export type RouteParamsListProps<T extends keyof AppRoutesParamsListProps> = CompositeScreenProps<ScreenProps<T>, TabsProps<T>>;

const Stack = createNativeStackNavigator<AppRoutesParamsListProps>();

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

