import React from "react";
import {StyleSheet, View, StatusBar, Dimensions} from "react-native";
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
    orientation: this.props.navigation.state.params.orientation,
    modalVisible: false,
    player1: "Player1",
    player2: "Player2",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  };
  static navigationOptions = {
    header: null
  };

  onLayout = e => {
    this.setState({
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    });
  };

  componentWillUnmount() {
    this.setState({modalVisible: false});
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  // getOrientation = async () => {
  //   if (this.refs.rootView) {
  //     if (Dimensions.get("window").width < Dimensions.get("window").height) {
  //       this.setState({orientation: "portrait"});
  //       console.log("portrait");
  //       // await ScreenOrientation.lockAsync(
  //       //   ScreenOrientation.Orientation.PORTRAIT
  //       // );
  //     } else {
  //       this.setState({orientation: "landsacpe"});
  //       console.log("landscape");
  //       // await ScreenOrientation.lockAsync(
  //       //   ScreenOrientation.Orientation.LANDSCAPE
  //       // );
  //     }
  //   }
  // };
  // portrait 세로모드
  componentDidMount() {
    //ScreenOrientation.unlockAsync();
    //this.getOrientation();
    // Dimensions.addEventListener("change", () => {
    //   this.getOrientation();
    // });
  }

  // async changeScreenOrientation() {
  //   const {orientation} = this.state;
  //   if (orientation === "portrait")
  //     await ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
  //   else
  //     await ScreenOrientation.lockAsync(
  //       ScreenOrientation.Orientation.LANDSCAPE
  //     );
  // }

  /////////////////portrait mode////////////////
  portrait_mode = () => {
    return (
      <View style={styles.container} onLayout={this.onLayout}>
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
  };

  /////////////////////////////landscape////////////////////
  landsacpe_mode = () => {
    return (
      <View
        onLayout={this.onLayout}
        style={{width: this.state.width, height: this.state.height}}
      >
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
      </View>
    );
  };

  render() {
    const {orientation} = this.state;
    // const {
    //   state: {
    //     params: {minute, second, user1, user2, getScoreTime}
    //   }
    // } = this.props.navigation;

    return (
      <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={"transparent"}
          translucent={true}
          hidden={true}
        />
        {/* <View ref="rootView" style={{flex: 1, marginTop: 5}}> */}
        {orientation === "portrait"
          ? this.portrait_mode()
          : this.landsacpe_mode()}
        {/* </View> */}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
