import React, {Component} from "react";
import {Text, View, StyleSheet, Button, Modal, TextInput} from "react-native";

export default class CustomModal extends Component {
  state = {
    modalVisible: false,
    player1: "Player1",
    player2: "Player2"
  };

  _handleButtonPress = () => {
    this.setModalVisible(true);
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  onChangePlayer1 = name => {
    this.setState({player1: name});
  };
  onChangePlayer2 = name => {
    this.setState({player2: name});
  };

  render() {
    let {player} = this.props;
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
        <Text onPress={this._handleButtonPress} style={{fontSize: 20}}>
          {player === "player1" ? this.state.player1 : this.state.player2}
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
