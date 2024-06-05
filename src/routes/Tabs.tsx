import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home,
  Profile,
  AddNewMemory,
  Explore,
} from '../screens';
import { ROUTES, COLORS } from '../constants';
import Icon from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

type Props = {
  color: string;
  name: string;
}

export const Tabs = () => {
  const getTabBarIcon = ({color, name}: Props) => {
    switch(name) {
      case ROUTES.HOME:
        return (
          <Icon
            size={24}
            color={color}
            name="home"
          />
        );
      case ROUTES.ADD_NEW_MEMORY:
        return (
          <Icon
            size={24}
            color={color}
            name="plus"
          />
        );
      case ROUTES.EXPLORE:
        return (
          <Icon
            size={24}
            color={color}
            name="compass"
          />
        );
      default:
        return;
    }
  };

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={{
        tabBarActiveTintColor: COLORS.purple,
      }}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({color}) =>
            getTabBarIcon({color, name: ROUTES.HOME}),
        }}
      />
      <Tab.Screen
        name={ROUTES.ADD_NEW_MEMORY}
        component={AddNewMemory}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({color}) =>
            getTabBarIcon({color, name: ROUTES.ADD_NEW_MEMORY}),
        }}
      />
      <Tab.Screen
        name={ROUTES.EXPLORE}
        component={Explore}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({color}) =>
            getTabBarIcon({color, name: ROUTES.EXPLORE}),
        }}
      />
    </Tab.Navigator>
  );
};
