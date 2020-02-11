import React, {Component} from "react";
import {View, Image, Text, ImageBackground} from "react-native";
import {connect} from "react-redux";
import originScoreFrame from "../assets/images/frame/scoreFrame.png";
import acquireScoreFrame from "../assets/images/frame/acquireScoreFrame.png";
import originScoreFrameLand from "../assets/images/frame/scoreFrameLand.png";
import CustomModal from "./CustomModal";
import GameInformation_1 from "./user/GameInformation_1";
import GameInformation_2 from "./user/GameInformation_2";
class ScoreFrame extends Component {
  render() {
    console.log();
    const {highlight_1, highlight_2, user, orientation} = this.props;
    return (
      <View style={{flex: 1}}>
        {orientation === "landscape" ? (
          user === "1" ? (
            highlight_1 ? (
              <ImageBackground
                source={acquireScoreFrame}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                imageStyle={{resizeMode: "stretch"}}
              >
                <CustomModal
                  player="PLAYER1"
                  user="user1"
                  style={{fontSize: 25, marginTop: 0}}
                />
                <GameInformation_1
                  style={{fontSize: 100, flex: 2}}
                  land={true}
                />
              </ImageBackground>
            ) : (
              <ImageBackground
                source={originScoreFrameLand}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                imageStyle={{resizeMode: "stretch"}}
              >
                <CustomModal
                  player="PLAYER1"
                  user="user1"
                  style={{fontSize: 25, marginTop: 0}}
                />

                <GameInformation_1
                  style={{fontSize: 100, flex: 2}}
                  land={true}
                />
              </ImageBackground>
            )
          ) : highlight_2 ? (
            <ImageBackground
              source={acquireScoreFrame}
              style={{flex: 1, justifyContent: "center", alignItems: "center"}}
              imageStyle={{resizeMode: "stretch"}}
            >
              <CustomModal
                player="PLAYER2"
                user="user2"
                style={{fontSize: 25, marginTop: 0}}
              />
              <GameInformation_2 style={{fontSize: 100, flex: 2}} land={true} />
            </ImageBackground>
          ) : (
            <ImageBackground
              source={originScoreFrameLand}
              style={{flex: 1, justifyContent: "center", alignItems: "center"}}
              imageStyle={{resizeMode: "stretch"}}
            >
              <CustomModal
                player="PLAYER2"
                user="user2"
                style={{fontSize: 25, marginTop: 0}}
              />
              <GameInformation_2 style={{fontSize: 100, flex: 2}} land={true} />
            </ImageBackground>
          )
        ) : user === "1" ? (
          highlight_1 ? (
            <ImageBackground
              source={acquireScoreFrame}
              style={{flex: 1, justifyContent: "center", alignItems: "center"}}
              imageStyle={{resizeMode: "stretch"}}
            >
              <CustomModal
                player="PLAYER1"
                user="user1"
                style={{fontSize: 32, marginTop: 20}}
              />
              <GameInformation_1
                style={{fontSize: 130, flex: 1}}
                land={false}
              />
            </ImageBackground>
          ) : (
            <ImageBackground
              source={originScoreFrame}
              style={{flex: 1, justifyContent: "center", alignItems: "center"}}
              imageStyle={{resizeMode: "stretch"}}
            >
              <CustomModal
                player="PLAYER1"
                user="user1"
                style={{fontSize: 32, marginTop: 20}}
              />

              <GameInformation_1
                style={{fontSize: 130, flex: 1}}
                land={false}
              />
            </ImageBackground>
          )
        ) : highlight_2 ? (
          <ImageBackground
            source={acquireScoreFrame}
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}
            imageStyle={{resizeMode: "stretch"}}
          >
            <CustomModal
              player="PLAYER2"
              user="user2"
              style={{fontSize: 32, marginTop: 20}}
            />
            <GameInformation_2 style={{fontSize: 130, flex: 1}} land={false} />
          </ImageBackground>
        ) : (
          <ImageBackground
            source={originScoreFrame}
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}
            imageStyle={{resizeMode: "stretch"}}
          >
            <CustomModal
              player="PLAYER2"
              user="user2"
              style={{fontSize: 32, marginTop: 20}}
            />
            <GameInformation_2 style={{fontSize: 130, flex: 1}} land={false} />
          </ImageBackground>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  highlight_1: state.scoreGame.highlight_1,
  highlight_2: state.scoreGame.highlight_2
});

export default connect(mapStateToProps, {})(ScoreFrame);
