import React, {Component} from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import {Button} from "react-native-elements";
import {connect} from "react-redux";
import showScoreButton from "../assets/images/buttons/showScoreButton.png";
import scoreInfoClose from "../assets/images/buttons/scoreInfoClose.png";

class GameScoreInfoButton extends Component {
  state = {
    modalVisible: false
  };

  _handleButtonPress = () => {
    this.setModalVisible(true);
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  render() {
    const {
      player1,
      player2,
      totalScore_1,
      totalScore_2,
      advantage_1,
      advantage_2,
      penalty_1,
      penalty_2
    } = this.props;
    var modalBackgroundStyle = {
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    };
    var innerContainerTransparentStyle = {
      backgroundColor: "#fff",
      padding: 20,
      width: 300,
      borderRadius: 20
    };
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
              <ScrollView>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginBottom: 25
                  }}
                >
                  <Text style={{fontSize: 25}}>{player1}</Text>
                  <Text style={{fontSize: 25}}>{player2}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "#5c154b",
                        fontSize: 20,
                        margin: 6
                      }}
                    >
                      {totalScore_1}
                    </Text>
                    <Text style={{color: "#7b74f9", fontSize: 20, margin: 6}}>
                      {advantage_1}
                    </Text>
                    <Text style={{color: "#fe5b1b", fontSize: 20, margin: 6}}>
                      {penalty_1}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{color: "#5c154b", fontSize: 20, margin: 6}}>
                      {totalScore_2}
                    </Text>
                    <Text style={{color: "#7b74f9", fontSize: 20, margin: 6}}>
                      {advantage_2}
                    </Text>
                    <Text style={{color: "#fe5b1b", fontSize: 20, margin: 6}}>
                      {penalty_2}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={this.setModalVisible.bind(this, false)}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 25
                  }}
                >
                  <Image
                    source={scoreInfoClose}
                    style={{resizeMode: "stretch"}}
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={this._handleButtonPress}>
          <Image source={showScoreButton} />
        </TouchableOpacity>
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
  totalScore_1: state.scoreGame.totalScore_1,
  advantage_1: state.scoreGame.advantage_1,
  penalty_1: state.scoreGame.penalty_1,
  totalScore_2: state.scoreGame.totalScore_2,
  advantage_2: state.scoreGame.advantage_2,
  penalty_2: state.scoreGame.penalty_2
});

export default connect(mapStateToProps, {})(GameScoreInfoButton);
