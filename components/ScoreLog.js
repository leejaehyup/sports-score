import React, {Component} from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  FlatList,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import {connect} from "react-redux";
import {deleteLog} from "../reducers/scoreGame";
import {Divider, Button} from "react-native-elements";
import gameLogButton from "../assets/images/buttons/gameLogButton.png";
import advantageLogBox from "../assets/images/frame/advantageLogBox.png";
import penaltyLogBox from "../assets/images/frame/penaltyLogBox.png";
import scoreLogBox from "../assets/images/frame/scoreLogBox.png";
import scoreLogClose from "../assets/images/buttons/scoreLogClose.png";
import deleteLogBtn from "../assets/images/buttons/deleteLog.png";

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
            <View
              style={{
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 20,
                width: "90%",
                height: "90%"
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  color: "black",
                  fontWeight: "bold"
                }}
              >
                Log
              </Text>
              <FlatList
                data={this.props.gameLog}
                renderItem={({item, index}) => {
                  const color = this.handleLogColor(item.key);
                  let box;
                  color === "purple"
                    ? (box = scoreLogBox)
                    : color === "red"
                    ? (box = penaltyLogBox)
                    : (box = advantageLogBox);
                  return (
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        flexDirection: "row",
                        marginTop: 5,
                        justifyContent: "space-between"
                      }}
                    >
                      <Image source={box} style={{position: "absolute"}} />
                      <Text
                        style={{
                          padding: 10,
                          fontSize: 18,
                          height: 44,
                          justifyContent: "flex-start",
                          color: color
                        }}
                      >
                        {item.key}
                      </Text>
                      <TouchableOpacity
                        style={{justifyContent: "center", alignItems: "center"}}
                        onPress={() => {
                          this.handleDeleteLog(item.key, index);
                        }}
                      >
                        <Image source={deleteLogBtn} />
                      </TouchableOpacity>
                      {/* <Button
                        title="x"
                        onPress={() => {
                          this.handleDeleteLog(item.key, index);
                        }}
                      ></Button> */}

                      <Divider
                        style={{backgroundColor: "black", marginTop: 5}}
                      />
                    </View>
                  );
                }}
              />
              <TouchableOpacity
                onPress={this.setModalVisible.bind(this, false)}
              >
                <Image source={scoreLogClose} />
              </TouchableOpacity>

              {/* <Button
                title="close"
                onPress={this.setModalVisible.bind(this, false)}
              /> */}
            </View>
          </View>
        </Modal>
        <TouchableHighlight onPress={this._handleButtonPress}>
          <Image source={gameLogButton} style={{width: 60, height: 35}} />
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
