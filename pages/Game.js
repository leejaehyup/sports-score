import React from "react";
import {StyleSheet, View, Dimensions, Text} from "react-native";
import ScoreButton from "../components/ScoreButton";
import PenaltyButton from "../components/PenaltyButton";
import AdvantageButton from "../components/AdvantageButton";
import GameTimer from "../components/GameTimer";
import GameInformation_2 from "../components/user/GameInformation_2";
import GameInformation_1 from "../components/user/GameInformation_1";
import CustomModal from "../components/CustomModal";
import {Divider} from "react-native-elements";
import ScoreLog from "../components/ScoreLog";
import GameEndButton from "../components/GameEndButton";
// redux
import {Provider} from "react-redux";
import store from "../store";
//orientation
import {ScreenOrientation} from "expo";

export default class GameScreen extends React.Component {
  state = {
    isLoading: true,
    orientation: "",
    modalVisible: false,
    player1: "Player1",
    player2: "Player2"
  };
  static navigationOptions = {
    header: null
  };

  componentWillUnmount() {
    this.setState({modalVisible: false});
  }

  getOrientation = async () => {
    if (this.refs.rootView) {
      if (Dimensions.get("window").width < Dimensions.get("window").height) {
        this.setState({orientation: "portrait"});
        // await ScreenOrientation.lockAsync(
        //   ScreenOrientation.Orientation.PORTRAIT
        // );
      } else {
        this.setState({orientation: "landsacpe"});
        // await ScreenOrientation.lockAsync(
        //   ScreenOrientation.Orientation.LANDSCAPE
        // );
      }
    }
  };
  // portrait 세로모드
  componentDidMount() {
    ScreenOrientation.unlockAsync();
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
    const {orientation} = this.state;
    // const {
    //   state: {
    //     params: {minute, second, user1, user2, getScoreTime}
    //   }
    // } = this.props.navigation;

    /////////////////portrait mode////////////////
    const portrait_mode = (
      <View style={styles.container}>
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
            <View style={{flex: 5}}>
              <GameInformation_1 />
            </View>
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
            <GameEndButton />
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
    );
    /////////////////////////////landscape////////////////////

    const landsacpe_mode = (
      <View style={landsacpe_styles.container}>
        <View style={landsacpe_styles.timer_container}>
          <GameTimer minute={5} second={0} />
          <ScoreLog />
          <GameEndButton />
        </View>
        <Divider style={{backgroundColor: "black", marginTop: 5}} />
        <View style={landsacpe_styles.player_container}>
          {/* 플레이어 1 */}

          <View style={landsacpe_styles.player_per_container}>
            <CustomModal player="player1" user="user1" />
            {/* 게임 정보 */}
            <GameInformation_1 />
          </View>

          {/* 플레이어 2 */}

          <View style={landsacpe_styles.player_per_container}>
            <CustomModal player="player2" user="user2" />

            {/* 게임 정보 */}
            <GameInformation_2 />
          </View>
        </View>
        <Divider style={{backgroundColor: "black", marginTop: 5}} />
        {/* 게임 버튼들 */}
        <View style={landsacpe_styles.button_container}>
          <View style={{flex: 1, flexDirection: "column"}}>
            <View style={{flex: 1, flexDirection: "row"}}>
              <View style={{flex: 1, backgroundColor: "red", margin: 5}}>
                <PenaltyButton user="user1" />
              </View>
              <View style={{flex: 1, backgroundColor: "blue", margin: 5}}>
                <AdvantageButton user="user1" />
              </View>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
              <View style={{flex: 1, backgroundColor: "purple", margin: 5}}>
                <ScoreButton user="user1" init_score="2" />
              </View>
              <View style={{flex: 1, backgroundColor: "purple", margin: 5}}>
                <ScoreButton user="user1" init_score="3" />
              </View>
              <View style={{flex: 1, backgroundColor: "purple", margin: 5}}>
                <ScoreButton user="user1" init_score="4" />
              </View>
            </View>
          </View>
          {/* 게임 버튼들 */}
          <View style={{flex: 1, flexDirection: "column"}}>
            <View style={{flex: 1, flexDirection: "row"}}>
              <View style={{flex: 1, backgroundColor: "red", margin: 5}}>
                <PenaltyButton user="user2" />
              </View>
              <View style={{flex: 1, backgroundColor: "blue", margin: 5}}>
                <AdvantageButton user="user2" />
              </View>
            </View>
            <View style={{flex: 1, flexDirection: "row"}}>
              <View style={{flex: 1, backgroundColor: "purple", margin: 5}}>
                <ScoreButton init_score="2" user="user2" />
              </View>
              <View style={{flex: 1, backgroundColor: "purple", margin: 5}}>
                <ScoreButton init_score="3" user="user2" />
              </View>
              <View style={{flex: 1, backgroundColor: "purple", margin: 5}}>
                <ScoreButton init_score="4" user="user2" />
              </View>
            </View>
          </View>
        </View>
      </View>
    );

    return (
      <Provider store={store}>
        <View ref="rootView" style={{flex: 1, marginTop: 5}}>
          {orientation === "portrait" ? portrait_mode : landsacpe_mode}
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

const landsacpe_styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 20,
    flex: 1
  },
  timer_container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  player_container: {
    flex: 5,
    flexDirection: "row"
  },
  player_per_container: {
    flex: 1,
    flexDirection: "column"
  },
  button_container: {
    flex: 4,
    flexDirection: "row"
  }
});
