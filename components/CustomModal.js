import React, {Component} from "react";
import {Text, View, StyleSheet, Button, Modal, TextInput} from "react-native";
import {connect} from "react-redux";
import {playerName} from "../reducers/scoreGame";

class CustomModal extends Component {
  state = {
    modalVisible: false,
    player1: "player1",
    player2: "player2"
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
    this.setState({player1: name});
    this.props.playerName(this.props.user, name);
  };
  onChangePlayer2 = name => {
    this.setState({player2: name});
    this.props.playerName(this.props.user, name);
  };

  render() {
    let {player, gameStart} = this.props;
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
              <Text>플레이어 이름을 설절해주세요.</Text>
              {player === "player1" ? (
                <TextInput
                  value={this.state.player1}
                  onChangeText={this.onChangePlayer1}
                  placeholder="User"
                />
              ) : (
                <TextInput
                  value={this.state.player2}
                  onChangeText={this.onChangePlayer2}
                  placeholder="User"
                />
              )}

              <Button
                title="close"
                onPress={this.setModalVisible.bind(this, false)}
              />
            </View>
          </View>
        </Modal>
        <Text
          onPress={this._handleButtonPress}
          style={{fontSize: 20, fontWeight: "bold"}}
        >
          {player === "player1" ? this.props.player1 : this.props.player2}
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
