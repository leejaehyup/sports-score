import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-elements";
import {scoreButton} from "../context/ScoreContext";

class ScoreButton extends React.Component {
  state = {
    timerOn: false, //타이머 온오프
    initScore: this.props.score, //초기 스코어
    scores: this.props.score + "", // 시간
    interval: null, // setInterval 함수
    changeInitScore: false, // 타이머를 초기 스코어로 바꿀지 여부
    totalScore: "0"
  };
  componentWillUnmount() {
    // component 나가면 interval 함수 클리어
    clearInterval(this.state.interval);
  }
  plusScore = () => {
    this.setState({totalScore: parseInt(this.state.totalScore) + 1 + ""});
    this.props.plus(this.props.user, parseInt(this.state.initScore));
  };
  minusScore = () => {
    this.setState({totalScore: parseInt(this.state.totalScore) - 1 + ""});
    this.props.minus(this.props.user, parseInt(this.state.initScore));
  };

  scorePressTimerOn = e => {
    const {timerOn, changeInitScore, initScore} = this.state;
    if (!timerOn && !changeInitScore) {
      this.setState({timerOn: true}); //타이머 온 - 한번 클릭시
      this.countdown();
    } else if (timerOn && !changeInitScore) {
      this.setState({timerOn: false, changeInitScore: true}); // 타이머 오프 - 두 번 클릭 시
      clearInterval(this.state.interval);
    } else {
      this.setState({scores: initScore, changeInitScore: false}); // 세 번 클릭 시
    }
  };
  // 3초 카운트
  countdown = () => {
    const {initScore, timerOn} = this.state;
    const startTimer = Date.now();
    this.setState({scores: "0"});
    this.setState({
      interval: setInterval(() => {
        let currentTimer = Date.now() - startTimer;
        const {getScoreTime} = this.props;
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
          this.setState({totalScore: parseInt(this.state.totalScore) + 1 + ""});
          this.props.plus(this.props.user, parseInt(this.state.initScore));
        } else {
          this.setState({
            //scores: (parseFloat(this.state.scores) + 0.1).toFixed(1) + ""
            scores: (currentTimer / 1000).toFixed(1) + ""
          });
        }
      }, 100)
    });
  };

  render() {
    const {scores, totalScore} = this.state;
    return (
      <View style={styles.container}>
        {scores !== "-1" ? (
          <View style={styles.scoreContainer}>
            <View style={styles.score_text}>
              {/* <Text style={{fontSize: 20}}>{totalScore}</Text> */}
            </View>
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
              <Button
                buttonStyle={{}}
                title="-"
                titleStyle={{fontSize: 20}}
                onPress={this.minusScore}
              />
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

export default scoreButton(ScoreButton);
