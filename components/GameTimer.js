import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import {Button, Text} from "react-native-elements";
import {connect} from "react-redux";
import {
  timerLoaded,
  gameReset,
  gameStart,
  gameStop,
  runScoreTimeFail,
  highlighting_off,
  runScoreTimeSuccess,
  runningScoreFail,
  runningScoreSuccess
} from "../reducers/scoreGame";

import ScoreLog from "./ScoreLog";
import GameEndButton from "./GameEndButton";

import gameStartButton from "../assets/images/buttons/gameStartButton.png";
import gamePauseButton from "../assets/images/buttons/gamePauseButton.png";
import gameResetButton from "../assets/images/buttons/gameResetButton.png";
import scoreInfoClose from "../assets/images/buttons/scoreInfoClose.png";

class GameTimer extends React.Component {
  state = {
    starting: false,
    resetCount:
      (parseInt(this.props.timer.min) * 60 + parseInt(this.props.timer.sec)) *
      1000,
    count:
      (parseInt(this.props.timer.min) * 60 + parseInt(this.props.timer.sec)) *
      1000,
    interval: null,
    timer: {
      min: "",
      sec: ""
    },
    modalVisible: false
  };

  /////////////

  modal = props => {
    const {
      timer: {min, sec},
      starting
    } = this.state;
    var modalBackgroundStyle = {
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    };
    const landStyle = {
      flex: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white"
    };
    const portStyle = {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white"
    };

    var innerContainerTransparentStyle = {
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 15
    };
    return (
      <View style={props.landFlex ? landStyle : portStyle}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <View
            style={[
              {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white"
              },
              modalBackgroundStyle
            ]}
          >
            <View style={innerContainerTransparentStyle}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "nanum-square-eb",
                  marginBottom: 5
                }}
              >
                시간 설정해주세요.
              </Text>

              <TextInput
                value={this.state.timer.min + ""}
                onChangeText={this.onChangeMin}
                placeholder="min"
                style={{
                  backgroundColor: "#E7E7E7",
                  color: "#BDBDBD",
                  fontSize: 20,
                  borderRadius: 5,
                  paddingLeft: 5,
                  height: 35
                }}
              />
              <TextInput
                value={this.state.timer.sec + ""}
                onChangeText={this.onChangeSec}
                placeholder="sec"
                style={{
                  backgroundColor: "#E7E7E7",
                  color: "#BDBDBD",
                  fontSize: 20,
                  borderRadius: 5,
                  paddingLeft: 5,
                  height: 35,
                  marginTop: 10,
                  marginBottom: 10
                }}
              />
              <TouchableOpacity onPress={this.filterNotNumber.bind(this)}>
                <Image source={scoreInfoClose} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Text
          onPress={this._handleButtonPress}
          style={{
            fontSize: 27,
            textAlign: "center",
            fontFamily: "nanum-square-b",
            marginRight: 5
          }}
        >
          {`${min}분:${sec}초`}
        </Text>
      </View>
    );
  };

  _handleButtonPress = () => {
    if (this.props.gameStarted) {
      alert("게임 시작 전에 설정해주세요");
      return;
    }

    this.setModalVisible(true);
  };

  filterNotNumber = () => {
    const {min, sec} = this.state.timer;
    if (!min || !sec) {
      alert("시간 설정을 해주세요");
      return;
    }

    let count = (parseInt(min) * 60 + parseInt(sec)) * 1000;
    this.setState({modalVisible: false, count, resetCount: count});
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  onChangeMin = min => {
    min = min.replace(/\D/g, "");
    this.setState(preState => ({timer: {...preState.timer, min: min}}));
  };

  onChangeSec = sec => {
    sec = sec.replace(/\D/g, "");
    // const regex = /^\d+(?:[.]?[\d]?[\d])?$/;
    // if(regex.test(sec)){
    // }
    // console.log(regex.test(sec));

    this.setState(preState => ({timer: {...preState.timer, sec: sec}}));
  };

  componentDidMount() {
    this.convert_Count_To_Timer(this.state.count);
  }
  componentWillUnmount() {
    // component 나가면 interval 함수 클리어
    clearInterval(this.state.interval);
  }
  // 총 카운트를 타이머로 변환
  convert_Count_To_Timer = count => {
    let min = parseInt(count / 1000 / 60);
    let sec = ((count / 1000) % 60) + "";
    this.setState({timer: {min, sec}}, () =>
      this.props.timerLoaded(this.state.timer)
    );
  };

  timer_CountDown = current => {
    const {interval} = this.state;
    if (current > 0) {
      let min = parseInt(current / 60000);
      let sec = ((current - min * 60000) / 1000).toFixed(1);
      this.setState({timer: {min: min, sec: sec}, count: current}, () =>
        this.props.timerLoaded(this.state.timer)
      );
    } else {
      clearInterval(interval);
      this.setState({timer: {min: 0, sec: "0"}, count: 0}, () =>
        this.props.timerLoaded(this.state.timer)
      );
      alert("경기 종료");
    }
  };
  // 타이머 시작
  onPress_Start_Timer = () => {
    const {interval, count} = this.state;
    this.props.gameStart();
    const startTimer = Date.now();
    if (!interval) {
      this.setState({
        interval: setInterval(() => {
          let currentTimer = Date.now() - startTimer;
          this.timer_CountDown(count - +currentTimer);
          //console.log(count * 1000 - +currentTimer);
          //this.timer_CountDown(min, sec);
        }, 120),
        starting: true
      });
    } else return;
  };
  // 타이머 중지
  onPress_Stop_Timer = () => {
    const {player1, player2, run_score_time} = this.props;
    this.props.gameStop();
    const {interval} = this.state;
    clearInterval(interval);
    this.setState({interval: null, starting: false});
    this.props.highlighting_off(player1);
    this.props.highlighting_off(player2);
    run_score_time
      ? this.props.runningScoreSuccess()
      : this.props.runningScoreFail();
  };

  onPress_Reset_Timer = () => {
    const {player1, player2, run_score_time} = this.props;
    const {resetCount, interval} = this.state;
    clearInterval(interval);
    this.setState({count: resetCount, interval: null, starting: false});
    this.convert_Count_To_Timer(resetCount);
    this.props.gameReset();
    this.props.highlighting_off(player1);
    this.props.highlighting_off(player2);
    run_score_time
      ? this.props.runningScoreSuccess()
      : this.props.runningScoreFail();
  };

  render() {
    const {
      timer: {min, sec},
      starting
    } = this.state;
    return (
      <View style={styles.timer_Container}>
        <View
          style={{
            flex: this.props.landFlex ? 8 : 4,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <this.modal
            min={min + ""}
            sec={sec + ""}
            landFlex={this.props.landFlex}
          />
          {/* <Text style={styles.timer_Text}>{`${min}분:${sec}초`}</Text> */}
        </View>
        <View style={{flex: 5, flexDirection: "row"}}>
          {starting ? (
            <TouchableOpacity
              onPress={this.onPress_Stop_Timer}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image source={gamePauseButton} style={{resizeMode: "stretch"}} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={this.onPress_Start_Timer}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image source={gameStartButton} style={{resizeMode: "stretch"}} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={this.onPress_Reset_Timer}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={gameResetButton} style={{resizeMode: "stretch"}} />
          </TouchableOpacity>

          <View
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}
          >
            <ScoreLog />
          </View>
          <View
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}
          >
            <GameEndButton />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  timer_Container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  timer_Text: {
    fontSize: 30,
    textAlign: "center",
    marginRight: 10
  }
});
const mapStateToProps = state => ({
  timer: state.scoreGame.timer,
  gameStarted: state.scoreGame.gameStart,
  player1: state.scoreGame.player1,
  player2: state.scoreGame.player2,
  runningScore: state.scoreGame.runningScore,
  run_score_time: state.scoreGame.run_score_time
});

export default connect(mapStateToProps, {
  timerLoaded,
  gameReset,
  gameStart,
  gameStop,
  runScoreTimeFail,
  highlighting_off,
  runningScoreFail,
  runningScoreSuccess,
  runScoreTimeSuccess,
  runScoreTimeFail
})(GameTimer);
