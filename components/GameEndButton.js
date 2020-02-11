import React, {Component} from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  Picker,
  Alert,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import {Button} from "react-native-elements";
import {connect} from "react-redux";
import {gameReset} from "../reducers/scoreGame";
import WinnerLottie from "./lottie/WinnerLottie";
import GameScoreInfoButton from "./GameScoreInfoButton";
import gameEndButton from "../assets/images/buttons/gameEndButton.png";
import judgeButton from "../assets/images/buttons/judgeButton.png";
import judgeCloseButton from "../assets/images/buttons/judgeCloseButton.png";
import winnerTxt from "../assets/images/font/winnerTxt.png";
import loserFrame from "../assets/images/frame/loserFrame.png";
import winnerFrame from "../assets/images/frame/winnerFrame.png";
import winLogo from "../assets/images/frame/winLogo.png";

class GameEndButton extends Component {
  state = {
    modalVisible: false,
    judge: false,
    reason: "점수",
    highlightPlayer: "",
    winner: "",
    cause: "",
    difference: 0
  };

  _handleButtonPress = () => {
    const {gameStart} = this.props;
    gameStart
      ? alert("게임 중지 후 눌러주세요")
      : Alert.alert(
          "게임 중지를 하시겠습니까",
          "",
          [
            {
              text: "취소",
              onPress: () => this.setModalVisible(false),
              style: "cancel"
            },
            {text: "확인", onPress: () => this.setModalVisible(true)}
          ],
          {cancelable: false}
        );
  };

  setModalVisible = visible => {
    // visible === false ? this.props.gameReset() : "";

    this.setState({
      modalVisible: visible,
      judge: false,
      highlightPlayer: "",
      reason: "점수",
      cause: "",
      difference: 0,
      winner: ""
    });
  };
  judgement = () => {
    if (this.state.highlightPlayer === "" && this.state.reason !== "점수") {
      alert("승리자를 선택해주세요");
      return;
    }
    this.setState({judge: true});
    this.state.reason === "점수" ? this.chooseVicotr() : "";
  };

  chooseVicotr = () => {
    let {
      player1,
      player2,
      advantage_1,
      advantage_2,
      totalScore_1,
      totalScore_2,
      penalty_1,
      penalty_2
    } = this.props;
    // 점수로 판단
    if (totalScore_1 > totalScore_2) {
      this.setState({
        winner: player1,
        cause: "점수",
        difference: totalScore_1 - totalScore_2
      });
      return;
    }
    if (totalScore_1 < totalScore_2) {
      this.setState({
        winner: player2,
        cause: "점수",
        difference: totalScore_2 - totalScore_1
      });
      return;
    }
    // 점수가 같을 시 어드밴티지로 판단
    if (totalScore_1 === totalScore_2) {
      if (advantage_1 > advantage_2) {
        this.setState({
          winner: player1,
          cause: "어드밴티지",
          difference: advantage_1 - advantage_2
        });
        return;
      }

      if (advantage_1 < advantage_2) {
        this.setState({
          winner: player2,
          cause: "어드밴티지",
          difference: advantage_2 - advantage_1
        });
        return;
      }

      // 어드밴티지 같을 시 패널티로 판단
      if (advantage_1 === advantage_2) {
        if (penalty_1 > penalty_2) {
          this.setState({
            winner: player1,
            cause: "패널티",
            difference: penalty_1 - penalty_2
          });
          return;
        }

        if (penalty_1 < penalty_2) {
          this.setState({
            winner: player2,
            cause: "패널티",
            difference: penalty_2 - penalty_1
          });
          return;
        }

        // 패널티 같을 시 심판 합의
        if (penalty_1 === penalty_2)
          return (
            <Button
              title="같은 점수로 심판 합의"
              titleStyle={{fontSize: 20}}
              buttonStyle={{backgroundColor: "purple"}}
              onPress={this.judgement}
            />
          );
      }
    }
  };

  render() {
    const {
      player1,
      player2,
      advantage_1,
      advantage_2,
      totalScore_1,
      totalScore_2,
      penalty_1,
      penalty_2
    } = this.props;
    const {judge, highlightPlayer, winner, cause, difference} = this.state;
    var modalBackgroundStyle = {
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    };
    var innerContainerTransparentStyle = {
      backgroundColor: "#fff",
      padding: 20,
      flex: 1
    };
    return (
      <SafeAreaView
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={styles.container}>
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
                  backgroundColor: "white"
                },
                modalBackgroundStyle
              ]}
            >
              <ScrollView style={{flex: 1}}>
                {!judge ? (
                  <View
                    style={{
                      backgroundColor: "#fff",
                      padding: 20,
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <View
                      style={{
                        marginTop: 30,
                        borderColor: "purple",
                        borderWidth: 3,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 30,
                        flex: 1
                      }}
                    >
                      <Picker
                        selectedValue={this.state.reason}
                        mode="dropdown"
                        style={{
                          flex: 1,
                          width: 200,
                          opacity: 0.5
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({reason: itemValue})
                        }
                      >
                        <Picker.Item label="점수" value="점수" />
                        <Picker.Item label="서브미션" value="서브미션" />
                        <Picker.Item label="경기중단" value="경기중단" />
                        <Picker.Item label="실격" value="실격" />
                        <Picker.Item label="실신" value="실신" />
                        <Picker.Item label="추첨" value="추첨" />
                        <Picker.Item label="기타" value="기타" />
                      </Picker>
                    </View>
                    {this.state.reason !== "점수" ? (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Image source={winnerTxt} />
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginTop: 30,
                            marginBottom: 30,
                            justifyContent: "space-between",
                            alignItems: "stretch"
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              marginRight: 10,
                              height: 40
                            }}
                          >
                            {this.state.highlightPlayer ===
                            this.props.player1 ? (
                              <ImageBackground
                                source={winnerFrame}
                                style={{
                                  flex: 1,
                                  justifyContent: "center",
                                  alignItems: "center"
                                }}
                                imageStyle={{resizeMode: "stretch"}}
                              >
                                <Text
                                  style={{fontSize: 25, textAlign: "center"}}
                                  onPress={() => {
                                    this.setState({
                                      highlightPlayer: this.props.player1
                                    });
                                  }}
                                >
                                  {this.props.player1}
                                </Text>
                              </ImageBackground>
                            ) : (
                              <ImageBackground
                                source={loserFrame}
                                style={{
                                  flex: 1,
                                  justifyContent: "center",
                                  alignItems: "center"
                                }}
                                imageStyle={{
                                  resizeMode: "stretch"
                                }}
                              >
                                <Text
                                  style={{fontSize: 25, textAlign: "center"}}
                                  onPress={() => {
                                    this.setState({
                                      highlightPlayer: this.props.player1
                                    });
                                  }}
                                >
                                  {this.props.player1}
                                </Text>
                              </ImageBackground>
                            )}
                          </View>
                          <View
                            style={{
                              flex: 1,
                              height: 40
                            }}
                          >
                            {this.state.highlightPlayer ===
                            this.props.player2 ? (
                              <ImageBackground
                                source={winnerFrame}
                                style={{
                                  flex: 1,
                                  justifyContent: "center",
                                  alignItems: "center"
                                }}
                                imageStyle={{resizeMode: "stretch"}}
                              >
                                <Text
                                  style={{fontSize: 25, textAlign: "center"}}
                                  onPress={() => {
                                    this.setState({
                                      highlightPlayer: this.props.player2
                                    });
                                  }}
                                >
                                  {this.props.player2}
                                </Text>
                              </ImageBackground>
                            ) : (
                              <ImageBackground
                                source={loserFrame}
                                style={{
                                  flex: 1,
                                  justifyContent: "center",
                                  alignItems: "center"
                                }}
                                imageStyle={{resizeMode: "stretch"}}
                              >
                                <Text
                                  style={{fontSize: 25, textAlign: "center"}}
                                  onPress={() => {
                                    this.setState({
                                      highlightPlayer: this.props.player2
                                    });
                                  }}
                                >
                                  {this.props.player2}
                                </Text>
                              </ImageBackground>
                            )}
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View></View>
                    )}
                    <TouchableOpacity
                      style={{
                        marginTop: 30,
                        marginBottom: 10,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      onPress={this.judgement}
                    >
                      <Image
                        source={judgeButton}
                        style={{
                          resizeMode: "stretch"
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={this.setModalVisible.bind(this, false)}
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        marginRight: 10,
                        marginLeft: 10,
                        alignItems: "center"
                      }}
                    >
                      <Image
                        source={judgeCloseButton}
                        style={{
                          resizeMode: "stretch"
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={innerContainerTransparentStyle}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Image source={winLogo} />
                    </View>
                    {this.state.reason === "점수" ? (
                      <View>
                        {winner !== "" ? (
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                              marginTop: 10
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 30,
                                marginBottom: 5,
                                color: "#ffb53e"
                              }}
                            >
                              {winner}
                            </Text>
                            <Text
                              style={{fontSize: 20, marginBottom: 10}}
                            >{`${cause} ${difference}점차`}</Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Text style={{fontSize: 20, margin: 10}}>
                              동일 점수로 인한 심판 합의
                            </Text>
                          </View>
                        )}
                      </View>
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 30,
                            marginBottom: 5,
                            color: "#ffb53e"
                          }}
                        >
                          {highlightPlayer}
                        </Text>
                        <Text style={{fontSize: 20, marginBottom: 10}}>
                          {this.state.reason}
                        </Text>
                      </View>
                    )}
                    <GameScoreInfoButton />
                    <TouchableOpacity
                      onPress={this.setModalVisible.bind(this, false)}
                      style={{
                        marginTop: 10,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Image source={judgeCloseButton} />
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </View>
          </Modal>
          <TouchableOpacity
            onPress={this._handleButtonPress}
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}
          >
            <Image source={gameEndButton} style={{resizeMode: "stretch"}} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#ecf0f1"
  },
  viewLayer: {
    flexDirection: "row"
  },
  varietyFont: {
    fontSize: 30
  },
  advantageFont: {
    fontSize: 30,
    color: "blue"
  },
  penaltyFont: {
    fontSize: 30,
    color: "red"
  },
  scoreFont: {
    fontSize: 30,
    color: "purple"
  },
  judgementFont: {
    fontSize: 30
  }
});
const mapStateToProps = state => ({
  player1: state.scoreGame.player1,
  player2: state.scoreGame.player2,
  gameStart: state.scoreGame.gameStart,
  totalScore_1: state.scoreGame.totalScore_1,
  advantage_1: state.scoreGame.advantage_1,
  penalty_1: state.scoreGame.penalty_1,
  totalScore_2: state.scoreGame.totalScore_2,
  advantage_2: state.scoreGame.advantage_2,
  penalty_2: state.scoreGame.penalty_2
});

export default connect(mapStateToProps, {gameReset})(GameEndButton);
