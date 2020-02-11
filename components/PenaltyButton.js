import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text
} from "react-native";
import {Button} from "react-native-elements";
import {connect} from "react-redux";
import {
  penaltyIncrement,
  penaltyDecrement,
  gameLog
} from "../reducers/scoreGame";
import penaltyButton from "../assets/images/buttons/penaltyButton.png";
import CustomModal from "./Element/CustomModal";

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
        <TouchableOpacity
          onPress={this.onPress_Penalty_ScoreUp}
          style={{flex: 1}}
        >
          <ImageBackground
            source={penaltyButton}
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}
            imageStyle={{resizeMode: "stretch"}}
          >
            <Text
              style={{
                fontSize: 30,
                color: "white",
                fontFamily: "nanum-square-b"
              }}
            >
              P
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
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
