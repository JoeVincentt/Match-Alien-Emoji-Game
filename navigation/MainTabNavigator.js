import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import GameScreen from "../screens/GameScreen";
import LandingScreen from "../screens/LandingScreen";

const GameStack = createStackNavigator(
  {
    Landing: LandingScreen,
    Game: GameScreen
  },
  {
    headerMode: "none"
  }
);

export default GameStack;
