import React from "react";
import {View, Text, Button} from "react-native";
import {TextInput} from "react-native-gesture-handler";

export default class ConfigureScreen extends React.Component {
  state = {
    minute: "",
    second: ""
  };
  render() {
    const {minute, second} = this.state;
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>configure page</Text>
        <TextInput
          style={{height: 40, borderColor: "gray", borderWidth: 1}}
          onChangeText={minute => this.setState({minute})}
          value={this.state.minute}
        />
        <Text>분</Text>
        <TextInput
          style={{height: 40, borderColor: "gray", borderWidth: 1}}
          onChangeText={second => this.setState({second})}
          value={this.state.second}
        />
        <Text>초</Text>
        <Button
          title="Go game screen"
          onPress={() =>
            this.props.navigation.navigate("Game", {minute, second})
          }
        />
      </View>
    );
  }
}
