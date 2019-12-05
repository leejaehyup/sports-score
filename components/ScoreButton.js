import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-elements";
import {totalScore} from "../context/ScoreContext";

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

  render() {
    const {scores, totalScore} = this.state;
    return (
      <View style={styles.Button_Container}>
        {scores !== "-1" ? (
          <View>
            <Button
              title={scores + ""}
              titleStyle={{fontSize: 20}}
              buttonStyle={{backgroundColor: "purple"}}
              onPress={this.scorePressTimerOn}
            />
            <View style={styles.plus_Minus_Button_Container}>
              <Button
                title="+"
                buttonStyle={{flex: 1, width: "100%", height: "100%"}}
                onPress={this.plusScore}
              />
              <Button
                buttonStyle={{flex: 1, width: "100%", height: "100%"}}
                title="-"
                onPress={this.minusScore}
              />
            </View>
            <Text style={styles.button_text}>{totalScore}</Text>
          </View>
        ) : (
          <Text>123</Text>
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
    // paddingRight: 5,
    // paddingTop: 5,
    // flexDirection: "row",
    // justifyContent: "space-between"
    margin: 5,
    padding: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch"
  },

  button_text: {
    fontSize: 40,
    textAlign: "center"
  }
});

export default totalScore(ScoreButton);
