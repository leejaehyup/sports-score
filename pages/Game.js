import React from "react";
import {StyleSheet, View, Text} from "react-native";
import ScoreButton from "../components/ScoreButton";
import PenaltyButton from "../components/PenaltyButton";
import AdvantageButton from "../components/AdvantageButton";
import GameTimer from "../components/GameTimer";
import GameInformation_2 from "../components/user/GameInformation_2";
import GameInformation_1 from "../components/user/GameInformation_1";
import {ScoreProvider} from "../context/ScoreContext";

export default class GameScreen extends React.Component {
  state = {
    isLoading: true
  };
  render() {
    const {
      state: {
        params: {minute, second}
      }
    } = this.props.navigation;
    return (
      <ScoreProvider>
        <View style={styles.container}>
          <View style={{flex: 1, flexDirection: "column"}}>
            <Text>ID1</Text>
            <GameInformation_1 />
            <Text>ID2</Text>
            <GameInformation_2 />
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
            <View style={styles.timer_Container}>
              <GameTimer minute={minute} second={second} />
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
          </View>
        </View>
      </ScoreProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row"
  },
  button_container: {
    flex: 4,
    flexDirection: "column"
  },
  buttonsGroup_1: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 3
  },
  buttonsGroup_2: {
    flexDirection: "row",
    flex: 3
  },
  additionButtons: {
    justifyContent: "space-between",
    flex: 2,
    flexDirection: "row"
  },
  timer_Container: {
    flex: 1
  }
});
