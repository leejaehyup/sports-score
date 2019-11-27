import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-elements";

export default class ScoreButton extends React.Component {
  state = {
    timerOn: false, //타이머 온오프
    initScore: "", //초기 스코어
    scores: "-1", // 시간
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
  };
  minusScore = () => {
    this.setState({totalScore: parseInt(this.state.totalScore) - 1 + ""});
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
  // 카운트 세기
  countdown = () => {
    this.setState({scores: "0"});
    this.setState({
      interval: setInterval(() => {
        this.setState({
          scores: (parseFloat(this.state.scores) + 0.1).toFixed(1) + ""
        });
      }, 100)
    });
  };

  componentDidUpdate(preProps) {
    const {score} = this.props; // prop으로 받은 score
    const {scores} = this.state; // state에 저장될 변수
    if (!scores || scores === "-1") {
      this.setState({scores: score, initScore: score});
    }
  }

  render() {
    const {scores, totalScore} = this.state;

    return (
      <View style={styles.Button_Container}>
        {scores !== "-1" ? (
          <View>
            <Button
              title={scores}
              buttonStyle={{backgroundColor: "purple"}}
              onPress={this.scorePressTimerOn}
            />
            <View style={styles.plus_Minus_Button_Container}>
              <Button
                title="+"
                buttonStyle={{width: 55}}
                onPress={this.plusScore}
              />
              <Button
                buttonStyle={{width: 55, start: 6}}
                title="-"
                onPress={this.minusScore}
              />
            </View>
            <Text style={styles.button_text}>{totalScore}</Text>
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Button_Container: {
    flex: 1,
    margin: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  plus_Minus_Button_Container: {
    flexDirection: "row"
  },

  button_text: {
    fontSize: 40,
    textAlign: "center"
  }
});
