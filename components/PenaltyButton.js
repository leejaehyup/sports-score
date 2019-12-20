import React from "react";
import {StyleSheet, View} from "react-native";
import {Button} from "react-native-elements";
import {penaltyScore} from "../context/ScoreContext";

class PenaltyButton extends React.Component {
  state = {
    count: 0
  };

  onPress_Penalty_ScoreUp = () => {
    const {count} = this.state;
    this.setState({count: count + 1});
    this.props.penalty_plus(this.props.user);
  };
  minusPenalty = () => {
    this.setState({count: this.state.count - 1});
    this.props.penalty_minus(this.props.user);
  };

  render() {
    const {count} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.penalty_container}>
          <View style={styles.penalty_text}>
            {/* <Text style={styles.button_text}>{count}</Text> */}
          </View>
          <View style={styles.penalty_button}>
            <Button
              title="P"
              titleStyle={{fontSize: 20}}
              buttonStyle={{backgroundColor: "red"}}
              onPress={this.onPress_Penalty_ScoreUp}
            />
          </View>
          <View style={styles.minus_button}>
            <Button
              title="-"
              titleStyle={{fontSize: 20}}
              onPress={this.minusPenalty}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  penalty_container: {
    flex: 1,
    flexDirection: "row"
  },
  penalty_text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  penalty_button: {
    flex: 3
  },
  minus_button: {
    flex: 1
  },
  button_text: {
    fontSize: 20
  }
});

export default penaltyScore(PenaltyButton);
