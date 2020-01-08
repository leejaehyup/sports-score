import React from "react";
import {View, Text, Button, Switch} from "react-native";
import BeltLottie from "../components/lottie/BeltLottie";
import {ScreenOrientation} from "expo";

export default class IndexScreen extends React.Component {
  state = {
    orientation: false
  };
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
  }
  render() {
    const {orientation} = this.state;
    return (
      <View style={{flex: 1}}>
        <BeltLottie />
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text
            style={{
              fontSize: 50,
              marginTop: -150,
              color: "gray",
              fontFamily: "sans-serif-condensed"
            }}
          >
            sports score
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              margin: 15
            }}
          >
            <Text
              style={
                orientation
                  ? {color: "red", fontSize: 15, opacity: 0}
                  : {color: "red", fontSize: 15}
              }
            >
              세로모드
            </Text>
            <Switch
              style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}], margin: 10}}
              value={this.state.orientation}
              onValueChange={v => {
                this.setState({orientation: v});
              }}
            />
            <Text
              style={
                orientation
                  ? {color: "blue", fontSize: 15}
                  : {color: "blue", fontSize: 15, opacity: 0}
              }
            >
              가로모드
            </Text>
          </View>
          <Button
            title="Go Game screen"
            onPress={() => {
              let orientation;
              this.state.orientation
                ? (orientation = "landscape")
                : (orientation = "portrait");
              orientation === "portrait"
                ? ScreenOrientation.lockAsync(
                    ScreenOrientation.Orientation.PORTRAIT
                  )
                : ScreenOrientation.lockAsync(
                    ScreenOrientation.Orientation.LANDSCAPE
                  );
              this.props.navigation.navigate("Game", {
                orientation: orientation
              });
            }}
          />
        </View>
      </View>
    );
  }
}
