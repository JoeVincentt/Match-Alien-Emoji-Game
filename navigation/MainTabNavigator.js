import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import HomeScreen from "../screens/HomeScreen";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    headerMode: "none"
  }
);

export default HomeStack;
