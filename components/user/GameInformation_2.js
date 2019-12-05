import React from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {withScore} from "../../context/ScoreContext";

class GameInformation extends React.Component {
  render() {
    const {value_2} = this.props;
    return (
      <View style={styles.Button_Container}>
        <Text style={styles.button_text}>총점</Text>
        <Text style={styles.button_text1}>{value_2}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Button_Container: {
    flex: 1
  },
  button_text: {
    fontSize: 20,
    textAlign: "center"
  },
  button_text1: {
    fontSize: 50,
    textAlign: "center"
  }
});

export default withScore(GameInformation);
