import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import { width, height } from "../constants/Layout";
import { soundPlay } from "../utils/sound";

export default class Card extends React.Component {
  state = {
    flipped: false
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"]
    });
    this.flipCard();
  }

  flipCard() {
    soundPlay(require("../assets/sounds/clickreg.wav"));
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 12,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 360,
        friction: 12,
        tension: 10
      }).start();
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    };

    let image_source = require("../assets/images/question.png");
    if (this.props.is_open) {
      image_source = this.props.src;
    }

    return (
      <View style={styles.card}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (this.props.is_open) {
              this.props.clickCard();
            } else {
              this.props.clickCard();
              this.flipCard();
            }
          }}
          activeOpacity={0.75}
          underlayColor={"#f1f1f1"}
        >
          <Animated.Image
            style={[
              { width: width * 0.15, height: height * 0.1 },
              frontAnimatedStyle
            ]}
            source={image_source}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center"
  }
});
