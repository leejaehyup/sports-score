import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Text} from "react-native-elements";

export default class GameTimer extends React.Component {
  state = {
    count:
      (parseInt(this.props.minute) * 60 + parseInt(this.props.second)) * 1000,
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
    let min = parseInt(count / 1000 / 60);
    let sec = ((count / 1000) % 60) + ".000";
    this.setState({timer: {min, sec}});
  };

  // 타이머 하나씩 감소
  // timer_CountDown = (min, sec) => {
  //   let numMin = parseInt(min);
  //   let numSec = parseFloat(sec);
  //   const {interval} = this.state;
  //   if (numMin === 0 && numSec === 0) {
  //     clearInterval(interval);
  //   } else if (parseInt(numSec) === 0) {
  //     this.setState({timer: {min: numMin - 1 + "", sec: "59.9"}});
  //   } else {
  //     this.setState({
  //       timer: {min: numMin + "", sec: (numSec - 0.1).toFixed(1) + ""}
  //     });
  //   }
  // };
  timer_CountDown = current => {
    const {interval} = this.state;
    if (current > 0) {
      let min = parseInt(current / 60000);
      let sec = ((current - min * 60000) / 1000).toFixed(3);
      this.setState({timer: {min: min, sec: sec}, count: current});
    } else {
      clearInterval(interval);
      this.setState({timer: {min: 0, sec: "0.000"}, count: 0});
    }
  };
  // 타이머 시작
  onPress_Start_Timer = () => {
    const {interval, count} = this.state;
    const startTimer = Date.now();
    if (!interval) {
      this.setState({
        interval: setInterval(() => {
          let currentTimer = Date.now() - startTimer;
          this.timer_CountDown(count - +currentTimer);
          //console.log(count * 1000 - +currentTimer);
          //this.timer_CountDown(min, sec);
        }, 25)
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
      <View style={styles.timer_Container}>
        <Text style={styles.timer_Text}>{`${min}분:${sec}초`}</Text>
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
  timer_Container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  timer_Text: {
    fontSize: 30,
    textAlign: "center"
  }
});
