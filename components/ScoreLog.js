import React, {Component} from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  FlatList,
  Image,
  TouchableHighlight
} from "react-native";
import {connect} from "react-redux";
import {deleteLog} from "../reducers/scoreGame";
import {Divider, Button} from "react-native-elements";
import gameLogButton from "../assets/images/buttons/gameLogButton.png";

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
              <Text style={{textAlign: "center", fontSize: 15, color: "blue"}}>
                Log
              </Text>
              <FlatList
                data={this.props.gameLog}
                renderItem={({item, index}) => {
                  const color = this.handleLogColor(item.key);

                  return (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        marginTop: 5,
                        borderWidth: 3,
                        borderColor: color,
                        justifyContent: "space-between"
                      }}
                    >
                      <Text style={styles.item}>{item.key}</Text>

                      <Button
                        title="x"
                        onPress={() => {
                          this.handleDeleteLog(item.key, index);
                        }}
                      ></Button>

                      <Divider
                        style={{backgroundColor: "black", marginTop: 5}}
                      />
                    </View>
                  );
                }}
              />
              <Button
                title="close"
                onPress={this.setModalVisible.bind(this, false)}
              />
            </View>
          </View>
        </Modal>
        <TouchableHighlight onPress={this._handleButtonPress}>
          <Image source={gameLogButton} />
        </TouchableHighlight>

        {/* <Button title="Log" onPress={this._handleButtonPress} /> */}
      </View>
    );
  };

  handleLogColor = log => {
    let l = log.toLowerCase().split(" ");
    let color;
    l[2] === "s"
      ? (color = "purple")
      : l[2] === "p"
      ? (color = "red")
      : (color = "blue");

    return color;
  };

  handleDeleteLog = (log, index) => {
    let l = log.toLowerCase().split(" ");
    this.props.deleteLog(l[0], l[2], l[3], index);
  };

  _handleButtonPress = () => {
    if (this.props.gameLog.length <= 0) {
      alert("log가 없습니다");
      return;
    }
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
    height: 44,
    justifyContent: "flex-start"
  }
});
const mapStateToProps = state => ({
  gameLog: state.scoreGame.gameLog,
  log: state.scoreGame.log
});

export default connect(mapStateToProps, {deleteLog})(ScoreLog);
