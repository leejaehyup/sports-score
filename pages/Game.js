import React from "react";
import {StyleSheet, View} from "react-native";
import ScoreButton from "../components/ScoreButton";
import PenaltyButton from "../components/PenaltyButton";
import AdvantageButton from "../components/AdvantageButton";
import GameTimer from "../components/GameTimer";
import GameInformation_2 from "../components/user/GameInformation_2";
import GameInformation_1 from "../components/user/GameInformation_1";
import {ScoreProvider} from "../context/ScoreContext";
import CustomModal from "../components/CustomModal";
import {Divider} from "react-native-elements";
import ScoreLog from "../components/ScoreLog";
// redux
import {Provider} from "react-redux";
import store from "../store";
// import {ScreenOrientation} from "expo";

export default class GameScreen extends React.Component {
  state = {
    isLoading: true,
    orientation: "",
    modalVisible: false,
    player1: "Player1",
    player2: "Player2"
  };
  componentWillUnmount() {
    this.setState({modalVisible: false});
  }

  // getOrientation = () => {
  //   if (this.refs.rootView) {
  //     if (Dimensions.get("window").width < Dimensions.get("window").height) {
  //       this.setState({orientation: "portrait"});
  //       ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
  //     } else {
  //       this.setState({orientation: "landsacpe"});
  //       ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE);
  //     }
  //   }
  // };

  // componentDidMount() {
  //   this.getOrientation();
  //   Dimensions.addEventListener("change", () => {
  //     this.getOrientation();
  //   });
  // }

  // async changeScreenOrientation() {
  //   const {orientation} = this.state;
  //   if (orientation === "portrait")
  //     await ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
  //   else
  //     await ScreenOrientation.lockAsync(
  //       ScreenOrientation.Orientation.LANDSCAPE
  //     );
  // }

  render() {
    // const {
    //   state: {
    //     params: {minute, second, user1, user2, getScoreTime}
    //   }
    // } = this.props.navigation;

    return (
      <Provider store={store}>
        <View style={{flex: 1, marginTop: 5}}>
          <View ref="rootView" style={styles.container}>
            {/* 플레이어 1 */}
            <View style={{flex: 3, flexDirection: "row"}}>
              <View style={{flex: 4, flexDirection: "column"}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <CustomModal player="player1" user="user1" />
                </View>
                {/* 게임 정보 */}

                <GameInformation_1 />
              </View>
              {/* 게임 버튼들 */}
              <View style={styles.button_container}>
                <View style={styles.buttonsGroup_1}>
                  <ScoreButton user="user1" init_score="2" />
                  <ScoreButton user="user1" init_score="3" />
                  <ScoreButton user="user1" init_score="4" />
                </View>
                <View style={styles.additionButtons}>
                  <PenaltyButton user="user1" />
                  <AdvantageButton user="user1" />
                </View>
              </View>
            </View>
            {/* 타이머 */}
            <Divider style={{backgroundColor: "black", marginTop: 5}} />
            <View
              style={{
                flex: 1,
                flexDirection: "column"
              }}
            >
              <View style={styles.timer_Container}>
                <GameTimer minute={5} second={0} />
                <ScoreLog />
              </View>
            </View>
            <Divider style={{backgroundColor: "black", marginBottom: 5}} />
            {/* 플레이어 2 */}
            <View style={{flex: 3, flexDirection: "row"}}>
              <View style={{flex: 4, flexDirection: "column"}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <CustomModal player="player2" user="user2" />
                </View>
                {/* 게임 정보 */}
                <GameInformation_2 />
              </View>
              {/* 게임 버튼들 */}
              <View style={styles.button_container}>
                <View style={styles.buttonsGroup_2}>
                  <ScoreButton init_score="2" user="user2" />
                  <ScoreButton init_score="3" user="user2" />
                  <ScoreButton init_score="4" user="user2" />
                </View>
                <View style={styles.additionButtons}>
                  <PenaltyButton user="user2" />
                  <AdvantageButton user="user2" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 20,
    backgroundColor: "white",
    flexDirection: "column"
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  userText: {
    fontSize: 20,
    color: "blue",
    textAlign: "center"
  }
});
