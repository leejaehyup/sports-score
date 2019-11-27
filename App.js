import React from "react";
import {StyleSheet, Text, View, Alert} from "react-native";
import ScoreButton from "./components/ScoreButton";
import PenaltyButton from "./components/PenaltyButton";
import AdvantageButton from "./components/AdvantageButton";
import GameTimer from "./components/GameTimer";
import * as Location from "expo-location";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: {latitude, longitude}
      } = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
      this.setState({isLoading: false});
    } catch (error) {
      Alert.alert("권한 거절.");
    }
  };
  componentDidMount() {
    this.getLocation();
  }

  render() {
    return (
      <View style={styles.container}>
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
            <GameTimer />
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  button_container: {
    flex: 1,
    marginTop: 50
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
