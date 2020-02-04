import React, {Component} from "react";
import {View, Image} from "react-native";
import {connect} from "react-redux";
import originScoreFrame from "../assets/images/frame/scoreFrame.png";
import acquireScoreFrame from "../assets/images/frame/acquireScoreFrame.png";

class ScoreFrame extends Component {
  render() {
    const {highlight_1, highlight_2, user} = this.props;
    return (
      <View style={{position: "absolute"}}>
        {user === "1" ? (
          highlight_1 ? (
            <Image source={acquireScoreFrame} />
          ) : (
            <Image source={originScoreFrame} />
          )
        ) : highlight_2 ? (
          <Image source={acquireScoreFrame} />
        ) : (
          <Image source={originScoreFrame} />
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
