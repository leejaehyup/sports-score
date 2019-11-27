import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-elements";

export default class PenaltyButton extends React.Component {
  state = {
    count: 0
  };
  onPress_Advantage_ScoreUp = () => {
    const {count} = this.state;
    this.setState({count: count + 1});
  };

  render() {
    const {count} = this.state;
    return (
      <View style={styles.Button_Container}>
        <Button
          title="어드밴티지"
          buttonStyle={{backgroundColor: "blue"}}
          onPress={this.onPress_Advantage_ScoreUp}
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
