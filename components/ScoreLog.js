import React, {Component} from "react";
import {scoreButton} from "../context/ScoreContext";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  TextInput,
  FlatList
} from "react-native";

class ScoreLog extends Component {
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
              <Text>Log</Text>
              <FlatList
                data={[
                  {key: "Devin"},
                  {key: "Dan"},
                  {key: "Dominic"},
                  {key: "Jackson"},
                  {key: "James"},
                  {key: "Joel"},
                  {key: "John"},
                  {key: "Jillian"},
                  {key: "Jimmy"},
                  {key: "Julie"},
                  {key: "a"},
                  {key: "b"},
                  {key: "c"},
                  {key: "d"},
                  {key: "e"},
                  {key: "f"},
                  {key: "g"},
                  {key: "h"},
                  {key: "j"},
                  {key: "k"}
                ]}
                renderItem={({item}) => (
                  <View>
                    {console.log(item)}
                    <Text style={styles.item}>{item.key}</Text>
                  </View>
                )}
              />
              <Button
                title="close"
                onPress={this.setModalVisible.bind(this, false)}
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
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
export default scoreButton(ScoreLog);
