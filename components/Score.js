import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Score extends Component {
  render() {
    const { score } = this.props;

    return (
      <View style={styles.score_container}>
        <Text style={styles.score}>{score} / 12 </Text>
      </View>
    );
  }
}

const styles = {
  score_container: {
    alignItems: "center"
  },
  score: {
    fontSize: 40,
    fontWeight: "bold"
  }
};
