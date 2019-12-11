import React from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {gameInfoScore} from "../../context/ScoreContext";

class GameInformation extends React.Component {
  render() {
    const {value_2, advantage_2, penalty_2} = this.props;
    return (
      <View style={styles.gameInfo_Container}>
        <Text style={styles.button_text}>총점</Text>
        <Text style={styles.button_text1}>{value_2}</Text>
        <Text style={styles.penalty_text}>{penalty_2}</Text>
        <Text style={styles.advantage_text}>{advantage_2}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  gameInfo_Container: {
    flex: 4
  },
  button_text: {
    fontSize: 20,
    textAlign: "center"
  },
  button_text1: {
    fontSize: 80,
    textAlign: "center"
  },
  penalty_text: {
    fontSize: 40,
    textAlign: "center"
  },
  advantage_text: {
    fontSize: 40,
    textAlign: "center"
  }
});

export default gameInfoScore(GameInformation);
