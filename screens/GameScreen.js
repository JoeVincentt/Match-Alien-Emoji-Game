import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Alert,
  ImageBackground
} from "react-native";

import Score from "../components/Score";
import Card from "../components/Card";

import { soundPlay } from "../utils/sound";
import shuffleArray from "../utils/shuffleArray";
import { height } from "../constants/Layout";

export default class Game extends Component {
  state = {
    current_selection: [],
    selected_pairs: [],
    score: 0,
    cards_data: this.props.navigation.getParam("difficulty"),
    scoreToWin: this.props.navigation.getParam("scoreToWin"),
    picColumns: this.props.navigation.getParam("picColumns")
  };

  componentWillMount() {
    const { cards_data } = this.state;
    //set Cards to play
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
    const { picColumns, scoreToWin } = this.state;
    let contents = this.state.cards;

    return (
      <ImageBackground
        source={require("../assets/images/background.png")}
        imageStyle={{ resizeMode: "cover" }}
        style={{ flex: 1 }}
      >
        <View style={{ marginTop: height * 0.075 }} />
        <Score score={this.state.score} scoreToWin={scoreToWin} />
        <View style={{}}>
          <FlatList
            data={contents}
            renderItem={this.renderCard}
            numColumns={picColumns}
            keyExtractor={item => item.id}
            columnWrapperStyle={styles.flatlistRow}
          />
        </View>
      </ImageBackground>
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
          soundPlay(require("../assets/sounds/success.wav"));
          score += 1;
          selected_pairs.push(cards[index].name);

          this.setState({
            score: score
          });

          if (score == this.state.scoreToWin) {
            setTimeout(() => {
              soundPlay(require("../assets/sounds/click.wav"));
              score = 0;
              this.resetCards();
            }, 800);
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

  resetCards = async () => {
    let cards = this.cards.map(card => {
      card.is_open = false;
      return card;
    });

    cards = await shuffleArray(cards);

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
