import React, { Component } from "react";
import { View, Text } from "react-native";
import MonoText from "./StyledText";
import { height } from "../constants/Layout";

export default class Score extends Component {
  render() {
    const { score, scoreToWin } = this.props;

    return (
      <View style={styles.score_container}>
        <MonoText style={styles.score}>
          {score} / {scoreToWin}
        </MonoText>
      </View>
    );
  }
}

const styles = {
  score_container: {
    alignItems: "center"
  },
  score: {
    fontSize: height * 0.05,
    fontWeight: "bold",
    color: "white"
  }
};
