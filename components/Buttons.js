import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { LinearGradient } from "expo";

export const BounceButton = props => {
  const colors = ["#ba68c8", "#90a4ae", "#90a4ae", "#ba68c8"];

  var scaleValue = new Animated.Value(0);
  function scale() {
    scaleValue.setValue(0);
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.easeOutBack
    }).start(() => props.onPress());
  }
  function onPress() {
    scale();
  }
  function getContent() {
    return props.children;
  }
  const buttonScale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 2, 1]
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.button, props.style]}>
        <Animated.View
          style={[
            {
              transform: [{ scale: buttonScale }]
            }
          ]}
        >
          <LinearGradient
            colors={props.colors ? props.colors : colors}
            style={{ borderRadius: 10 }}
          >
            <View
              style={[
                props.innerStyle ? props.innerStyle : "",
                styles.default_button
              ]}
            >
              {getContent()}
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  default_button: {
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    shadowColor: "#4a148c",
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 1
  }
});
