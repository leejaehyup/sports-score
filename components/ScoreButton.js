import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-elements";
import {
  increment,
  decrement,
  gameLog,
  log,
  runScoreTimeFail,
  runScoreTimeSuccess
} from "../reducers/scoreGame";
import {connect} from "react-redux";

class ScoreButton extends React.Component {
  state = {
    timerOn: false, //타이머 온오프
    initScore: this.props.init_score, //초기 스코어
    scores: this.props.init_score + "", // 시간
    interval: null, // setInterval 함수
    changeInitScore: false, // 타이머를 초기 스코어로 바꿀지 여부
    getScoreTime: 3
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

  scorePressTimerOn = e => {
    const {timerOn, changeInitScore, initScore} = this.state;
    const {gameStart, run_score_time} = this.props;
    if (!gameStart) {
      alert("게임 시작을 해주세요");
      return;
    }
    if (!timerOn && !changeInitScore && !run_score_time) {
      this.setState({timerOn: true}); //타이머 온 - 한번 클릭시
      this.countdown();
      this.props.runScoreTimeSuccess();
    } else if (timerOn && !changeInitScore) {
      this.setState({timerOn: false, changeInitScore: true}); // 타이머 오프 - 두 번 클릭 시
      clearInterval(this.state.interval);
      this.props.runScoreTimeFail();
    } else {
      this.setState({scores: initScore, changeInitScore: false}); // 세 번 클릭 시
    }
  };
  // 3초 카운트
  countdown = () => {
    const startTimer = Date.now();
    this.setState({scores: "0"});
    this.setState({
      interval: setInterval(() => {
        let currentTimer = Date.now() - startTimer;
        const {getScoreTime, initScore} = this.state;
        const {
          timer,
          player1,
          player2,
          user,
          totalScore_1,
          totalScore_2
        } = this.props;
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
        } else {
          this.setState({
            //scores: (parseFloat(this.state.scores) + 0.1).toFixed(1) + ""
            scores: (currentTimer / 1000).toFixed(1) + ""
          });
        }
      }, 50)
    });
  };

  render() {
    const {scores} = this.state;
    return (
      <View style={styles.container}>
        {scores !== "-1" ? (
          <View style={styles.scoreContainer}>
            <View style={styles.score_text}></View>
            <View style={styles.scoreButton}>
              <Button
                title={scores + ""}
                titleStyle={{fontSize: 20}}
                buttonStyle={{backgroundColor: "purple"}}
                onPress={this.scorePressTimerOn}
              />
            </View>
            <View style={styles.plus_Minus_Button_Container}>
              {/* <Button
                title="+"
                buttonStyle={{flex: 1, width: "100%", height: "100%"}}
                onPress={this.plusScore}
              /> */}
              {/* <Button
                buttonStyle={{}}
                title="-"
                titleStyle={{fontSize: 20}}
                onPress={this.minusScore}
              /> */}
            </View>
          </View>
        ) : (
          <Text>123</Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  scoreContainer: {
    flex: 1,
    flexDirection: "row"
  },
  scoreButton: {
    flex: 3
  },
  plus_Minus_Button_Container: {
    flex: 1
  },
  score_text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
const mapStateToProps = state => ({
  timer: state.scoreGame.timer,
  player1: state.scoreGame.player1,
  player2: state.scoreGame.player2,
  totalScore_1: state.scoreGame.totalScore_1,
  totalScore_2: state.scoreGame.totalScore_2,
  gameStart: state.scoreGame.gameStart,
  run_score_time: state.scoreGame.run_score_time
});

export default connect(mapStateToProps, {
  increment,
  decrement,
  gameLog,
  log,
  runScoreTimeFail,
  runScoreTimeSuccess
})(ScoreButton);
