import React from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {connect} from "react-redux";

class GameInformation_1 extends React.Component {
  render() {
    const highlight_style = {
      on: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#A6A6A6",
        left: 15
      },
      off: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        left: 15
      }
    };
    const {totalScore_1, advantage_1, penalty_1} = this.props;
    return (
      <View style={styles.gameInfo_Container}>
        <View style={highlight_style.off}>
          {/* <Text style={styles.button_text}>총점 : </Text> */}
          <Text style={styles.score_text}>{totalScore_1}</Text>
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
              left: 35,
              top: 3
            }}
          >
            {/* <Text style={{fontSize: 20}}>P : </Text> */}
            <Text style={styles.penalty_text}>{penalty_1}</Text>
          </View>
          <View
            style={{
              flex: 1,
              top: 3,
              left: 3
            }}
          >
            {/* <Text style={{fontSize: 20}}>A : </Text> */}
            <Text style={styles.advantage_text}>{advantage_1}</Text>
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
  score_text: {
    fontSize: 130,
    textAlign: "center",
    color: "black"
  },
  penalty_text: {
    fontSize: 25,
    textAlign: "center",
    color: "white"
  },
  advantage_text: {
    fontSize: 25,
    textAlign: "center",
    color: "white"
  }
});
const mapStateToProps = state => ({
  totalScore_1: state.scoreGame.totalScore_1,
  advantage_1: state.scoreGame.advantage_1,
  penalty_1: state.scoreGame.penalty_1
});

export default connect(mapStateToProps)(GameInformation_1);
