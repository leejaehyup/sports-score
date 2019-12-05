import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-elements";

export default class GameTimer extends React.Component {
  state = {
    count: parseInt(this.props.minute) * 60 + parseInt(this.props.second),
    interval: null,
    timer: {
      min: "",
      sec: ""
    }
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
    let min = parseInt(count / 60);
    let sec = (count % 60) + ".0";
    this.setState({timer: {min, sec}});
  };

  // 타이머 하나씩 감소
  timer_CountDown = (min, sec) => {
    let numMin = parseInt(min);
    let numSec = parseFloat(sec);
    const {interval} = this.state;
    if (numMin === 0 && numSec === 0) {
      clearInterval(interval);
    } else if (parseInt(numSec) === 0) {
      this.setState({timer: {min: numMin - 1 + "", sec: "59.9"}});
    } else {
      this.setState({
        timer: {min: numMin + "", sec: (numSec - 0.1).toFixed(1) + ""}
      });
    }
  };
  // 타이머 시작
  onPress_Start_Timer = () => {
    const {interval} = this.state;
    if (!interval) {
      this.setState({
        interval: setInterval(() => {
          const {
            timer: {min, sec}
          } = this.state;
          this.timer_CountDown(min, sec);
        }, 100)
      });
    } else return;
  };
  // 타이머 중지
  onPress_Stop_Timer = () => {
    const {interval} = this.state;
    clearInterval(interval);
    this.setState({interval: null});
  };

  render() {
    const {
      timer: {min, sec}
    } = this.state;
    return (
      <View style={styles.Button_Container}>
        <Text style={styles.button_text}>{`${min}분:${sec}초`}</Text>
        <Button
          title="시작"
          buttonStyle={{backgroundColor: "black"}}
          onPress={this.onPress_Start_Timer}
        />
        <Button title="중지" onPress={this.onPress_Stop_Timer} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Button_Container: {
    flex: 1,
    margin: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  button_text: {
    fontSize: 30,
    textAlign: "center"
  }
});
