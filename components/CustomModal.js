import React, {Component} from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import {connect} from "react-redux";
import {playerName} from "../reducers/scoreGame";
import playerNameClose from "../assets/images/buttons/playerNameClose.png";

class CustomModal extends Component {
  state = {
    modalVisible: false,
    player1: "PLAYER1",
    player2: "PLAYER2"
  };

  _handleButtonPress = () => {
    const {gameStart} = this.props;
    if (gameStart) {
      alert("게임 시작 전에 가능합니다.");
      return;
    }
    this.setModalVisible(true);
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  onChangePlayer1 = name => {
    if (name.length > 10) {
      alert("글자 수 초과");
      return;
    }
    this.setState({player1: name});
    this.props.playerName(this.props.user, name);
  };
  onChangePlayer2 = name => {
    if (name.length > 10) {
      alert("글자 수 초과");
      return;
    }
    this.setState({player2: name});
    this.props.playerName(this.props.user, name);
  };

  render() {
    let {player, gameStart, style} = this.props;
    var modalBackgroundStyle = {
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    };
    var innerContainerTransparentStyle = {
      backgroundColor: "#fff",
      padding: 20,
      width: 300,
      borderRadius: 15
    };
    return (
      <View
        style={{
          flex: 1,
          marginTop: style.marginTop
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
              <Text
                style={{marginBottom: 15, fontSize: 20, fontWeight: "bold"}}
              >
                플레이어 이름을 설정해주세요.
              </Text>
              {player === "PLAYER1" ? (
                <TextInput
                  value={this.state.player1}
                  onChangeText={this.onChangePlayer1}
                  placeholder="User"
                  style={{
                    backgroundColor: "#E7E7E7",
                    color: "#BDBDBD",
                    fontSize: 20,
                    borderRadius: 5,
                    paddingLeft: 5,
                    height: 35
                  }}
                />
              ) : (
                <TextInput
                  style={{
                    backgroundColor: "#E7E7E7",
                    color: "#BDBDBD",
                    fontSize: 20,
                    borderRadius: 5,
                    paddingLeft: 5,
                    height: 35
                  }}
                  value={this.state.player2}
                  onChangeText={this.onChangePlayer2}
                  placeholder="User"
                />
              )}
              <TouchableOpacity
                onPress={this.setModalVisible.bind(this, false)}
                style={{marginTop: 25, alignItems: "center"}}
              >
                <Image source={playerNameClose} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Text
          onPress={this._handleButtonPress}
          style={{
            fontSize: style.fontSize,
            fontFamily: "nanum-square-eb"
          }}
        >
          {player === "PLAYER1" ? this.props.player1 : this.props.player2}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  }
});
const mapStateToProps = state => ({
  player1: state.scoreGame.player1,
  player2: state.scoreGame.player2,
  gameStart: state.scoreGame.gameStart
});

export default connect(mapStateToProps, {playerName})(CustomModal);
