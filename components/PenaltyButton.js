import React from "react";
import {StyleSheet, View, Image, TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";
import {connect} from "react-redux";
import {
  penaltyIncrement,
  penaltyDecrement,
  gameLog
} from "../reducers/scoreGame";
import penaltyButton from "../assets/images/buttons/penaltyButton.png";

class PenaltyButton extends React.Component {
  state = {
    loading: false
  };
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
    const {loading} = this.state;
    if (!gameStart) {
      alert("게임 시작을 해주세요");
      return;
    }
    if (loading) return;

    if (user.trim() === "user1") {
      this.props.gameLog({
        key: `${player1} ${timer.min}분${timer.sec}초 P +1`
      });
      this.props.penaltyIncrement(player1);
    } else {
      this.props.gameLog({
        key: `${player2} ${timer.min}분${timer.sec}초 P +1`
      });
      this.props.penaltyIncrement(player2);
    }
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({loading: false});
    }, 300);
  };
  minusPenalty = () => {
    const {timer, player1, player2, user, penalty_1, penalty_2} = this.props;

    if (user.trim() === "user1") {
      if (penalty_1 <= 0) return;
      this.props.gameLog({
        key: `${player1} ${timer.min}분${timer.sec}초 P -1`
      });
      this.props.penaltyDecrement(player1);
    } else {
      if (penalty_2 <= 0) return;
      this.props.gameLog({
        key: `${player2} ${timer.min}분${timer.sec}초 P -1`
      });
      this.props.penaltyDecrement(player2);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.penalty_container}>
          <View style={styles.penalty_text}></View>
          <View style={styles.penalty_button}>
            <TouchableOpacity onPress={this.onPress_Penalty_ScoreUp}>
              <Image source={penaltyButton} />
            </TouchableOpacity>
          </View>
          <View style={styles.minus_button}>
            {/* <Button
              title="-"
              titleStyle={{fontSize: 20}}
              onPress={this.minusPenalty}
            /> */}
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
