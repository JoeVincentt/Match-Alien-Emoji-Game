// import React from "react";
// import {
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";

// import { MonoText } from "../components/StyledText";

// export default class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <MonoText>Hello</MonoText>
//       </View>
//     );
//   }
// }
import React, { Component } from "react";
import { View, Text, Button, FlatList, Alert } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

import Score from "../components/Score";
import Card from "../components/Card";

import shuffleArray from "../utils/shuffleArray";

import cards_data from "../data/images";

export default class Game extends Component {
  state = {
    current_selection: [],
    selected_pairs: [],
    score: 0
  };

  componentWillMount() {
    let clone = JSON.parse(JSON.stringify(cards_data));

    this.cards = cards_data.concat(clone);
    this.cards.map(card => {
      let id = Math.random()
        .toString(36)
        .substring(7);
      card.id = id;
      card.is_open = false;
    });

    this.cards = shuffleArray(this.cards);
  }

  componentDidMount() {
    this.setState({
      cards: this.cards
    });
  }

  render() {
    let contents = this.state.cards;

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ marginTop: 150 }}>
          <FlatList
            data={contents}
            renderItem={this.renderCard}
            numColumns={4}
            keyExtractor={item => item.id}
            columnWrapperStyle={styles.flatlistRow}
          />
        </View>
        <Score score={this.state.score} />
      </View>
    );
  }

  renderCard = ({ item }) => {
    return (
      <Card
        key={item.id}
        src={item.src}
        name={item.name}
        is_open={item.is_open}
        clickCard={() => this.clickCard(item.id)}
      />
    );
  };

  clickCard = id => {
    let selected_pairs = [...this.state.selected_pairs];
    let current_selection = this.state.current_selection;
    let score = this.state.score;

    let index = this.state.cards.findIndex(card => {
      return card.id == id;
    });

    let cards = [...this.state.cards];

    if (
      cards[index].is_open == false &&
      selected_pairs.indexOf(cards[index].name) === -1
    ) {
      cards[index].is_open = true;
      current_selection.push({
        index: index,
        name: cards[index].name
      });

      if (current_selection.length == 2) {
        if (current_selection[0].name == current_selection[1].name) {
          score += 1;
          selected_pairs.push(cards[index].name);

          this.setState({
            score: score
          });

          if (score == 12) {
            score = 0;
            Alert.alert("Awesome!", "You won the game");
            this.resetCards();
          }
        } else {
          cards[current_selection[0].index].is_open = false;
          setTimeout(() => {
            cards[index].is_open = false;
            this.setState({
              cards: cards
            });
          }, 800);
        }

        current_selection = [];
      }
      this.setState({
        score: score,
        cards: cards,
        current_selection: current_selection
      });
    }
  };

  resetCards = () => {
    let cards = this.cards.map(card => {
      card.is_open = false;
      return card;
    });

    cards = shuffleArray(cards);

    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: cards,
      score: 0
    });
  };
}

const styles = {
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff"
  },
  body: {
    marginTop: 10
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  flatlistRow: {
    flex: 1,
    padding: 10
  }
};
