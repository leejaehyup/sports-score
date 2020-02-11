import React from "react";
import {StyleSheet, View, ImageBackground} from "react-native";
import {Text} from "react-native-elements";
import {connect} from "react-redux";
import PAscoreFrame from "../../assets/images/frame/PAscoreFrame.png";

class GameInformation_1 extends React.Component {
  render() {
    const {totalScore_1, advantage_1, penalty_1, style, land} = this.props;
    const highlight_style = {
      on: {
        flex: land ? 10 : 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A6A6A6",
        marginTop: 10
      },
      off: {
        flex: land ? 10 : 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
      }
    };

    return (
      <View style={styles.gameInfo_Container}>
        <View style={highlight_style.off}>
          {/* <Text style={styles.button_text}>총점 : </Text> */}
          <Text
            style={{
              fontSize: style.fontSize,
              textAlign: "center",
              color: "black"
            }}
          >
            {totalScore_1}
          </Text>
        </View>
        <View style={{flex: 10}}></View>
        <View
          style={{
            flex: land ? 7 : 5,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <View style={{flex: style.flex}}></View>
          <ImageBackground
            source={PAscoreFrame}
            style={{
              flex: 3,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
            imageStyle={{resizeMode: "stretch"}}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={styles.penalty_text}>{penalty_1}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={styles.advantage_text}>{advantage_1}</Text>
            </View>
          </ImageBackground>
          <View style={{flex: style.flex}}></View>
        </View>
        <View style={{flex: 2}}></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  gameInfo_Container: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  button_text: {
    fontSize: 20,
    textAlign: "center"
  },
  score_text: {
    fontSize: 130,
    textAlign: "center",
    color: "black",
    fontFamily: "nanum-square-b"
  },
  penalty_text: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontFamily: "nanum-square-b"
  },
  advantage_text: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontFamily: "nanum-square-b"
  }
});
const mapStateToProps = state => ({
  totalScore_1: state.scoreGame.totalScore_1,
  advantage_1: state.scoreGame.advantage_1,
  penalty_1: state.scoreGame.penalty_1
});

export default connect(mapStateToProps)(GameInformation_1);
