import React, {Component} from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  TextInput,
  FlatList
} from "react-native";
import {connect} from "react-redux";
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
                data={this.props.gameLog}
                renderItem={({item}) => (
                  <View>
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
        <Button title="Log" onPress={this._handleButtonPress} />
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
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
const mapStateToProps = state => ({
  gameLog: state.scoreGame.gameLog
});

export default connect(mapStateToProps)(ScoreLog);
