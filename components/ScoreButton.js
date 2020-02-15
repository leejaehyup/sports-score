import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import {Text} from "react-native-elements";
import {
  increment,
  decrement,
  gameLog,
  log,
  runScoreTimeFail,
  runScoreTimeSuccess,
  highlighting_off,
  highlighting_on,
  runningScoreFail
} from "../reducers/scoreGame";
import {connect} from "react-redux";
import scoreButton from "../assets/images/buttons/scoreButton.png";

class ScoreButton extends React.Component {
  state = {
    timerOn: false, //타이머 온오프
    initScore: this.props.init_score, //초기 스코어
    scores: this.props.init_score + "", // 시간
    interval: null, // setInterval 함수
    changeInitScore: false, // 타이머를 초기 스코어로 바꿀지 여부
    getScoreTime: 3,
    currentTime: null
  };

  highlight_on = user => {
    const {player1, player2} = this.props;
    if (user.trim() === "user1") {
      this.props.highlighting_on(player1);
    } else {
      this.props.highlighting_on(player2);
    }
  };
  highlight_off = user => {
    const {player1, player2} = this.props;
    if (user.trim() === "user1") {
      this.props.highlighting_off(player1);
    } else {
      this.props.highlighting_off(player2);
    }
  };

  componentWillUnmount() {
    // component 나가면 interval 함수 클리어
    clearInterval(this.state.interval);
  }
  minusScore = () => {
    const {
      timer,
      player1,
      player2,
      user,
      totalScore_1,
      totalScore_2
    } = this.props;
    const {initScore} = this.state;

    if (user.trim() === "user1") {
      if (totalScore_1 < initScore) return;

      this.props.gameLog({
        key: `${player1} ${timer.min}분${timer.sec}초 S -${initScore}`
      });
      this.props.decrement(this.props.player1, parseInt(this.state.initScore));
    } else {
      if (totalScore_2 < initScore) return;

      this.props.gameLog({
        key: `${player2} ${timer.min}분${timer.sec}초 S -${initScore}`
      });
      this.props.decrement(this.props.player2, parseInt(this.state.initScore));
    }
  };
  componentDidUpdate(preProps) {
    // runningScore -> 게임 중지 클릭시 true
    const {run_score_time, gameStart, runningScore, user} = this.props;
    const {timerOn} = this.state;
    if (run_score_time && runningScore) {
      if (!gameStart) {
        clearInterval(this.state.interval);
      }
    }
    if (gameStart && timerOn && runningScore && run_score_time) {
      this.setState({timerOn: true});
      this.countdown(true);
      this.props.runScoreTimeSuccess();
      this.highlight_on(user);
      this.props.runningScoreFail();
    }
  }

  scorePressTimerOn = e => {
    const {timerOn, changeInitScore, initScore} = this.state;
    const {gameStart, run_score_time, user} = this.props;

    // 게임 시작 후 -> 점수 획득 시간 후 -> 게임 중지 -> 버튼 눌러서 초기화
    if (!gameStart && timerOn) {
      this.setState({timerOn: false, scores: initScore});
      this.props.runningScoreFail();
      this.props.runScoreTimeFail();
      return;
    }

    if (!gameStart) {
      alert("게임 시작을 해주세요");
      return;
    }
    if (!timerOn && !changeInitScore && !run_score_time) {
      this.setState({timerOn: true}); //타이머 온 - 한번 클릭시
      this.countdown();
      this.props.runScoreTimeSuccess();
      this.highlight_on(user);
    } else if (timerOn && !changeInitScore) {
      this.setState({timerOn: false, changeInitScore: true}); // 타이머 오프 - 두 번 클릭 시
      clearInterval(this.state.interval);
      this.props.runScoreTimeFail();
      this.highlight_off(user);
    } else {
      this.props.runScoreTimeFail();
      this.setState({scores: initScore, changeInitScore: false}); // 세 번 클릭 시
    }
  };
  // 3초 카운트
  countdown = (reCount = false) => {
    const startTimer = Date.now();
    const {currentTime} = this.state;
    reCount ? null : this.setState({scores: "0"});
    this.setState({
      interval: setInterval(() => {
        let currentTimer = reCount
          ? Date.now() + currentTime - startTimer
          : Date.now() - startTimer;
        const {getScoreTime, initScore} = this.state;
        const {timer, player1, player2, user} = this.props;
        // tofiexd는 문자열 반환 -> number형으로 변환해서 비교
        if (
          +parseFloat(getScoreTime).toFixed(1) <=
          +parseFloat(this.state.scores).toFixed(1)
        ) {
          // 초기로 돌려놓기
          clearInterval(this.state.interval);
          this.setState({
            scores: initScore,
            changeInitScore: false,
            timerOn: false
          });
          // 점수 올리기
          this.props.runScoreTimeFail();
          this.highlight_off(user);
          if (user.trim() === "user1") {
            this.props.gameLog({
              key: `${player1} ${timer.min}분${timer.sec}초 S +${initScore}`
            });
            this.props.increment(player1, parseInt(initScore));
          } else {
            this.props.gameLog({
              key: `${player2} ${timer.min}분${timer.sec}초 S +${initScore}`
            });
            this.props.increment(player2, parseInt(initScore));
          }
          this.props.runScoreTimeFail();
        } else {
          this.setState({
            //scores: (parseFloat(this.state.scores) + 0.1).toFixed(1) + ""
            scores: (currentTimer / 1000).toFixed(1) + "",
            currentTime: currentTimer
          });
        }
      }, 100)
    });
  };

  render() {
    const {scores} = this.state;
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={this.scorePressTimerOn} style={{flex: 1}}>
          <ImageBackground
            source={scoreButton}
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}
            imageStyle={{resizeMode: "stretch"}}
          >
            <Text
              style={{
                fontSize: 30,
                color: "white",
                fontFamily: "nanum-square-b"
              }}
            >
              {scores + ""}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
const mapStateToProps = state => ({
  timer: state.scoreGame.timer,
  player1: state.scoreGame.player1,
  player2: state.scoreGame.player2,
  totalScore_1: state.scoreGame.totalScore_1,
  totalScore_2: state.scoreGame.totalScore_2,
  gameStart: state.scoreGame.gameStart,
  run_score_time: state.scoreGame.run_score_time,
  runningScore: state.scoreGame.runningScore
});

export default connect(mapStateToProps, {
  increment,
  decrement,
  gameLog,
  log,
  runScoreTimeFail,
  runScoreTimeSuccess,
  highlighting_off,
  highlighting_on,
  runningScoreFail
})(ScoreButton);
