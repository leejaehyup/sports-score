import React from "react";
import {StyleSheet, View} from "react-native";
import {Button} from "react-native-elements";
import {connect} from "react-redux";
import {
  penaltyIncrement,
  penaltyDecrement,
  gameLog
} from "../reducers/scoreGame";
class PenaltyButton extends React.Component {
  onPress_Penalty_ScoreUp = () => {
    const {
      timer,
      player1,
      player2,
      user,
      penalty_1,
      penalty_2,
      gameStart
    } = this.props;
    if (!gameStart) {
      alert("게임 시작을 해주세요");
      return;
    }
    this.props.penaltyIncrement(this.props.user);
    if (user.trim() === "user1") {
      this.props.gameLog({
        key: `${player1} ${timer.min}분${timer.sec}초 Pn + 1 = ${penalty_1 +
          1} `
      });
    } else {
      this.props.gameLog({
        key: `${player2}이 ${timer.min}분${timer.sec}초 Pn + 1 = ${penalty_2 +
          1}`
      });
    }
  };
  minusPenalty = () => {
    const {timer, player1, player2, user, penalty_1, penalty_2} = this.props;

    if (user.trim() === "user1") {
      if (penalty_1 <= 0) return;
      this.props.gameLog({
        key: `${player1} ${timer.min}분${timer.sec}초 Pn - 1 = ${penalty_1 -
          1} `
      });
      this.props.penaltyDecrement(this.props.user);
    } else {
      if (penalty_2 <= 0) return;
      this.props.gameLog({
        key: `${player2}이 ${timer.min}분${timer.sec}초 Pn - 1 = ${penalty_2 -
          1}`
      });
      this.props.penaltyDecrement(this.props.user);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.penalty_container}>
          <View style={styles.penalty_text}></View>
          <View style={styles.penalty_button}>
            <Button
              title="P"
              titleStyle={{fontSize: 20}}
              buttonStyle={{backgroundColor: "red"}}
              onPress={this.onPress_Penalty_ScoreUp}
            />
          </View>
          <View style={styles.minus_button}>
            <Button
              title="-"
              titleStyle={{fontSize: 20}}
              onPress={this.minusPenalty}
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
  penalty_container: {
    flex: 1,
    flexDirection: "row"
  },
  penalty_text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  penalty_button: {
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
  penalty_1: state.scoreGame.penalty_1,
  penalty_2: state.scoreGame.penalty_2,
  gameStart: state.scoreGame.gameStart
});

export default connect(mapStateToProps, {
  penaltyDecrement,
  penaltyIncrement,
  gameLog
})(PenaltyButton);
