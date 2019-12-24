import React from "react";
import {StyleSheet, View} from "react-native";
import {Button} from "react-native-elements";
import {connect} from "react-redux";
import {
  advantageIncrement,
  advantageDecrement,
  gameLog
} from "../reducers/scoreGame";

class AdvantageButton extends React.Component {
  onPress_Advantage_ScoreUp = () => {
    const {
      timer,
      player1,
      player2,
      user,
      advantage_1,
      advantage_2,
      gameStart
    } = this.props;
    if (!gameStart) {
      alert("게임 시작을 해주세요");
      return;
    }
    this.props.advantageIncrement(this.props.user);
    if (user.trim() === "user1") {
      this.props.gameLog({
        key: `${player1} ${timer.min}분${timer.sec}초에 Ad + 1 = ${advantage_1 +
          1}`
      });
    } else {
      this.props.gameLog({
        key: `${player2} ${timer.min}분${timer.sec}초에 Ad + 1 = ${advantage_2 +
          1}`
      });
    }
  };
  minusAdvantage = () => {
    const {
      timer,
      player1,
      player2,
      user,
      advantage_1,
      advantage_2,
      gameStart
    } = this.props;
    if (!gameStart) return;
    if (user.trim() === "user1") {
      if (advantage_1 <= 0) return;
      this.props.gameLog({
        key: `${player1} ${timer.min}분${timer.sec}초에 Ad - 1 = ${advantage_1 -
          1}`
      });
      this.props.advantageDecrement(this.props.user);
    } else {
      if (advantage_2 <= 0) return;
      this.props.gameLog({
        key: `${player2} ${timer.min}분${timer.sec}초에 Ad - 1 = ${advantage_2 -
          1}`
      });
      this.props.advantageDecrement(this.props.user);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.advantage_container}>
          <View style={styles.advantage_text}></View>
          <View style={styles.advantage_button}>
            <Button
              title="A"
              titleStyle={{fontSize: 20}}
              buttonStyle={{backgroundColor: "blue"}}
              onPress={this.onPress_Advantage_ScoreUp}
            />
          </View>
          <View style={styles.minus_button}>
            <Button
              buttonStyle={{}}
              title="-"
              titleStyle={{fontSize: 20}}
              onPress={this.minusAdvantage}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  advantage_container: {
    flex: 1,
    flexDirection: "row"
  },
  advantage_text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  advantage_button: {
    flex: 3
  },
  minus_button: {
    flex: 1
  },
  button_text: {
    fontSize: 20
  }
});
const mapStateToProps = state => ({
  timer: state.scoreGame.timer,
  player1: state.scoreGame.player1,
  player2: state.scoreGame.player2,
  advantage_1: state.scoreGame.advantage_1,
  advantage_2: state.scoreGame.advantage_2,
  gameStart: state.scoreGame.gameStart
});

export default connect(mapStateToProps, {
  advantageIncrement,
  advantageDecrement,
  gameLog
})(AdvantageButton);
