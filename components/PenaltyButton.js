import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-elements";

export default class PenaltyButton extends React.Component {
  state = {
    count: 0
  };
  onPress_Penalty_ScoreUp = () => {
    3;
    const {count} = this.state;
    this.setState({count: count + 1});
  };

  render() {
    const {count} = this.state;
    return (
      <View style={styles.Button_Container}>
        <Button
          title="패널티"
          buttonStyle={{backgroundColor: "red"}}
          onPress={this.onPress_Penalty_ScoreUp}
        />
        <Text style={styles.button_text}>{count}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Button_Container: {
    flex: 1,
    margin: 10
  },
  button_text: {
    fontSize: 30,
    textAlign: "center"
  }
});
