import React from "react";
import {StyleSheet, View, Modal, TextInput} from "react-native";
import {Button, Text} from "react-native-elements";
import {connect} from "react-redux";
import {
  timerLoaded,
  gameReset,
  gameStart,
  gameStop
} from "../reducers/scoreGame";

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
    var innerContainerTransparentStyle = {backgroundColor: "#fff", padding: 20};
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white"
        }}
      >
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
              <Text>시간 설정해주세요.</Text>

              <TextInput
                value={this.state.timer.min + ""}
                onChangeText={this.onChangeMin}
                placeholder="min"
              />
              <TextInput
                value={this.state.timer.sec + ""}
                onChangeText={this.onChangeSec}
                placeholder="sec"
              />
              <Button title="확인" onPress={this.filterNotNumber.bind(this)} />
            </View>
          </View>
        </Modal>
        <Text
          onPress={this._handleButtonPress}
          style={{fontSize: 30, textAlign: "center", marginRight: 10}}
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
    const regexp = /^[0-9]*$/;
    const {min, sec} = this.state.timer;
    // if (!regexp.test(+min)) {
    //   alert("숫자만 입력하세요");
    //   return;
    // }
    // if (!regexp.test(+sec)) {
    //   alert("숫자만 입력하세요");
    //   return;
    // }

    let count = (parseInt(min) * 60 + parseInt(sec)) * 1000;
    this.setState({modalVisible: false, count, resetCount: count});
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  onChangeMin = min => {
    this.setState(preState => ({timer: {...preState.timer, min: min}}));
  };

  onChangeSec = sec => {
    this.setState(preState => ({timer: {...preState.timer, sec: sec}}));
  };
  ///////////

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
    let sec = ((count / 1000) % 60) + ".00";
    this.setState({timer: {min, sec}}, () =>
      this.props.timerLoaded(this.state.timer)
    );
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
      let sec = ((current - min * 60000) / 1000).toFixed(2);
      this.setState({timer: {min: min, sec: sec}, count: current}, () =>
        this.props.timerLoaded(this.state.timer)
      );
    } else {
      clearInterval(interval);
      this.setState({timer: {min: 0, sec: "0.00"}, count: 0}, () =>
        this.props.timerLoaded(this.state.timer)
      );
      alert();
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
    this.props.gameStop();
    const {interval} = this.state;
    clearInterval(interval);
    this.setState({interval: null, starting: false});
  };

  onPress_Reset_Timer = () => {
    const {resetCount, interval} = this.state;
    clearInterval(interval);
    this.setState({count: resetCount, interval: null, starting: false});
    this.convert_Count_To_Timer(resetCount);
    this.props.gameReset();
  };

  render() {
    const {
      timer: {min, sec},
      starting
    } = this.state;
    return (
      <View style={styles.timer_Container}>
        <this.modal min={min + ""} sec={sec + ""} />
        {/* <Text style={styles.timer_Text}>{`${min}분:${sec}초`}</Text> */}
        <View style={{marginRight: 10}}>
          {starting ? (
            <Button title="중지" onPress={this.onPress_Stop_Timer} />
          ) : (
            <Button
              title="시작"
              buttonStyle={{backgroundColor: "black"}}
              onPress={this.onPress_Start_Timer}
            />
          )}
        </View>
        <View>
          <Button
            title="reset"
            buttonStyle={{backgroundColor: "black"}}
            onPress={this.onPress_Reset_Timer}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  timer_Container: {
    flex: 9,
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
  gameStarted: state.scoreGame.gameStart
});

export default connect(mapStateToProps, {
  timerLoaded,
  gameReset,
  gameStart,
  gameStop
})(GameTimer);
