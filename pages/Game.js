import React from "react";
import {StyleSheet, View, Text, Dimensions} from "react-native";
import ScoreButton from "../components/ScoreButton";
import PenaltyButton from "../components/PenaltyButton";
import AdvantageButton from "../components/AdvantageButton";
import GameTimer from "../components/GameTimer";
import GameInformation_2 from "../components/user/GameInformation_2";
import GameInformation_1 from "../components/user/GameInformation_1";
import {ScoreProvider} from "../context/ScoreContext";
import {ScreenOrientation} from "expo";

export default class GameScreen extends React.Component {
  state = {
    isLoading: true,
    orientation: ""
  };
  getOrientation = () => {
    if (this.refs.rootView) {
      if (Dimensions.get("window").width < Dimensions.get("window").height) {
        this.setState({orientation: "portrait"});
        ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
      } else {
        this.setState({orientation: "landsacpe"});
        ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE);
      }
    }
  };

  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener("change", () => {
      this.getOrientation();
    });
  }

  async changeScreenOrientation() {
    const {orientation} = this.state;
    if (orientation === "portrait")
      await ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
    else
      await ScreenOrientation.lockAsync(
        ScreenOrientation.Orientation.LANDSCAPE
      );
  }

  render() {
    const {
      state: {
        params: {minute, second, user1, user2, getScoreTime}
      }
    } = this.props.navigation;

    return (
      <ScoreProvider getScoreTime={getScoreTime}>
        <View style={{flex: 1, marginTop: 5}}>
          <View style={styles.timer_Container}>
            <GameTimer minute={minute} second={second} />
          </View>
          <View ref="rootView" style={styles.container}>
            <View style={{flex: 3, flexDirection: "column"}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={styles.userText}>{user1}</Text>
              </View>
              <GameInformation_1 />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={styles.userText}>{user2}</Text>
              </View>
              <GameInformation_2 />
              <View style={{flex: 1}}></View>
            </View>
            <View style={styles.button_container}>
              <View style={styles.buttonsGroup_1}>
                <ScoreButton score={"2"} />
                <ScoreButton score={"3"} />
                <ScoreButton score={"4"} />
              </View>
              <View style={styles.additionButtons}>
                <PenaltyButton />
                <AdvantageButton />
              </View>
              <View style={styles.buttonsGroup_2}>
                <ScoreButton score={"2"} />
                <ScoreButton score={"3"} />
                <ScoreButton score={"4"} />
              </View>
              <View style={styles.additionButtons}>
                <PenaltyButton />
                <AdvantageButton />
              </View>
              <View style={{flex: 1}}></View>
            </View>
          </View>
        </View>
      </ScoreProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: "white",
    flexDirection: "row"
  },
  button_container: {
    flex: 4,
    flexDirection: "column"
  },
  buttonsGroup_1: {
    justifyContent: "center",
    flexDirection: "column",
    flex: 3
  },
  buttonsGroup_2: {
    marginTop: 20,
    justifyContent: "center",
    flexDirection: "column",
    flex: 3
  },
  additionButtons: {
    // justifyContent: "space-between",
    // flex: 2,
    // flexDirection: "row"
    justifyContent: "center",
    flexDirection: "column",
    flex: 2
  },
  timer_Container: {
    // marginRight: 2,
    // position: "absolute",
    // right: "40%",
    // top: "45%"
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  userText: {
    fontSize: 20,
    color: "blue",
    textAlign: "center"
  }
});
