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
          style={{
            height: 30,
            borderColor: "gray",
            borderWidth: 1,
            width: "20%"
          }}
          onChangeText={minute => this.setState({minute})}
          value={this.state.minute}
          placeholder="minute"
        />
        <Text>분</Text>
        <TextInput
          style={{
            height: 30,
            borderColor: "gray",
            borderWidth: 1,
            width: "20%"
          }}
          onChangeText={second => this.setState({second})}
          value={this.state.second}
          placeholder="second"
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
