import React from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {connect} from "react-redux";

class GameInformation_2 extends React.Component {
  render() {
    const {totalScore_2, advantage_2, penalty_2} = this.props;
    return (
      <View style={styles.gameInfo_Container}>
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          <Text style={styles.button_text}>총점 : </Text>
          <Text style={styles.button_text1}>{totalScore_2}</Text>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
          >
            <Text style={{fontSize: 20}}>P : </Text>
            <Text style={styles.penalty_text}>{penalty_2}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
          >
            <Text style={{fontSize: 20}}>A : </Text>
            <Text style={styles.advantage_text}>{advantage_2}</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  gameInfo_Container: {
    flex: 5
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
const mapStateToProps = state => ({
  totalScore_2: state.scoreGame.totalScore_2,
  advantage_2: state.scoreGame.advantage_2,
  penalty_2: state.scoreGame.penalty_2
});

export default connect(mapStateToProps)(GameInformation_2);
