import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/question.png"),
        require("./assets/images/background.png"),
        require("./assets/images/alienemoji/1.png"),
        require("./assets/images/alienemoji/2.png"),
        require("./assets/images/alienemoji/3.png"),
        require("./assets/images/alienemoji/4.png"),
        require("./assets/images/alienemoji/5.png"),
        require("./assets/images/alienemoji/6.png"),
        require("./assets/images/alienemoji/7.png"),
        require("./assets/images/alienemoji/8.png"),
        require("./assets/images/alienemoji/9.png"),
        require("./assets/images/alienemoji/10.png"),
        require("./assets/images/alienemoji/11.png"),
        require("./assets/images/alienemoji/12.png"),
        require("./assets/images/alienemoji/13.png"),
        require("./assets/images/alienemoji/14.png"),
        require("./assets/images/alienemoji/15.png"),
        require("./assets/sounds/background.wav"),
        require("./assets/sounds/click.wav"),
        require("./assets/sounds/clickreg.wav"),

        require("./assets/sounds/success.wav")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
