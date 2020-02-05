import React, {Component} from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity
} from "react-native";

import gameStartOkButton from "../../assets/images/buttons/gameStartOkButton.png";

export default class ModalExample extends Component {
  state = {
    modalVisible: false
  };
  modal = () => {
    var modalBackgroundStyle = {
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    };
    var innerContainerTransparentStyle = {backgroundColor: "#fff", padding: 20};
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={innerContainerTransparentStyle}>
              <Text>게임을 시작해주세요</Text>
              <TouchableOpacity
                onPress={this.setModalVisible.bind(this, false)}
              >
                <Image source={gameStartOkButton} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {this.props.button}
      </View>
    );
  };

  _handleButtonPress = () => {
    this.setModalVisible(true);
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  render() {
    return (
      <View style={styles.container}>
        <this.modal />
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
