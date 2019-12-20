import React, {Component} from "react";
import {Text, View, StyleSheet, Button, Modal, TextInput} from "react-native";

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
              <Text>This is a modal</Text>
              <Button
                title="close"
                onPress={this.setModalVisible.bind(this, false)}
              />
              <TextInput
                // style={styles.textInput}
                // onChangeText={user1 => this.setState({user1})}
                //value={this.state.user1}
                placeholder="User"
              />
            </View>
          </View>
        </Modal>
        <Text onPress={this._handleButtonPress}>modal</Text>
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
              <Text>This is a modal</Text>
              <Button
                title="close"
                onPress={this.setModalVisible.bind(this, false)}
              />
              <TextInput
                // style={styles.textInput}
                // onChangeText={user1 => this.setState({user1})}
                //value={this.state.user1}
                placeholder="User"
              />
            </View>
          </View>
        </Modal>
        <Text onPress={this._handleButtonPress}>modal</Text>
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
