import React from "react";
import {View, Text, Button} from "react-native";
import BeltLottie from "../components/lottie/BeltLottie";

export default class IndexScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <BeltLottie />
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text style={{fontSize: 50, marginTop: -150}}>sports score</Text>
          <Button
            title="Go Game screen"
            onPress={() => this.props.navigation.navigate("Game")}
          />
        </View>
      </View>
    );
  }
}
