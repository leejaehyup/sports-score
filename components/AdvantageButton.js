import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-elements";
import {advantageScore} from "../context/ScoreContext";

class AdvantageButton extends React.Component {
  state = {
    count: 0
  };
  onPress_Advantage_ScoreUp = () => {
    const {count} = this.state;
    this.setState({count: count + 1});
    this.props.advantage_plus(this.props.user);
  };
  minusAdvantage = () => {
    this.setState({count: this.state.count - 1});
    this.props.advantage_minus(this.props.user);
  };

  render() {
    const {count} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.advantage_container}>
          <View style={styles.advantage_text}>
            {/* <Text style={styles.button_text}>{count}</Text> */}
          </View>
          <View style={styles.advantage_button}>
            <Button
              title="어드밴티지"
              buttonStyle={{backgroundColor: "blue"}}
              onPress={this.onPress_Advantage_ScoreUp}
            />
          </View>
          <View style={styles.minus_button}>
            <Button
              buttonStyle={{}}
              title="-"
              titleStyle={{fontSize: 20}}
              onPress={this.minusAdvantage}
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
    margin: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  advantage_container: {
    flex: 1,
    flexDirection: "row"
  },
  advantage_text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  advantage_button: {
    flex: 5
  },
  minus_button: {
    flex: 1
  },
  button_text: {
    fontSize: 20
  }
});

export default advantageScore(AdvantageButton);
