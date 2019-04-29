import React from "react";
import { View, Text, ImageBackground } from "react-native";
import MonoText from "../components/StyledText";
import { BounceButton } from "../components/Buttons";
import { height, width } from "../constants/Layout";
import { musicPlay, soundPlay } from "../utils/sound";
import eightTiles from "../data/eightTiles";
import sixTiles from "../data/sixTiles";
import thirtyTiles from "../data/thirtyTiles";
import twelveTiles from "../data/twelveTiles";
import twentyTiles from "../data/twentyTiles";

class LandingScreen extends React.Component {
  componentDidMount() {
    musicPlay(require("../assets/sounds/background.wav"));
  }

  navigate = (component, scoreToWin, picColumns) => {
    soundPlay(require("../assets/sounds/click.wav"));
    this.props.navigation.navigate("Game", {
      difficulty: component,
      scoreToWin: scoreToWin,
      picColumns: picColumns
    });
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/background.png")}
        imageStyle={{ resizeMode: "cover" }}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: width * 0.01
          }}
        >
          <BounceButton
            style={{ margin: 20 }}
            innerStyle={{ width: width * 0.4, height: height * 0.1 }}
            onPress={() => this.navigate(sixTiles, 3, 3)}
          >
            <MonoText style={{ color: "white", fontSize: 20 }}>easy</MonoText>
          </BounceButton>
          <BounceButton
            style={{ margin: 20 }}
            innerStyle={{ width: width * 0.25, height: height * 0.15 }}
            onPress={() => this.navigate(eightTiles, 4, 4)}
          >
            <MonoText style={{ color: "white", fontSize: 20 }}>medium</MonoText>
          </BounceButton>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 20
          }}
        >
          <BounceButton
            style={{ margin: 20 }}
            innerStyle={{ width: width * 0.25, height: height * 0.15 }}
            onPress={() => this.navigate(twelveTiles, 6, 3)}
          >
            <MonoText style={{ color: "white", fontSize: 20 }}>hard</MonoText>
          </BounceButton>
          <BounceButton
            style={{ margin: 20 }}
            innerStyle={{ width: width * 0.4, height: height * 0.1 }}
            onPress={() => this.navigate(twentyTiles, 10, 5)}
          >
            <MonoText style={{ color: "white", fontSize: 20 }}>pro</MonoText>
          </BounceButton>
        </View>
        <BounceButton
          style={{ margin: 20 }}
          innerStyle={{ width: width * 0.65, height: height * 0.1 }}
          onPress={() => this.navigate(thirtyTiles, 15, 6)}
        >
          <MonoText style={{ color: "white", fontSize: 20 }}>legend</MonoText>
        </BounceButton>
      </ImageBackground>
    );
  }
}

export default LandingScreen;
