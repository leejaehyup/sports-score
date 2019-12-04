import React from "react";
import {View, Text, Button} from "react-native";

export default class IndexScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>sports score</Text>
        <Button
          title="Go configure screen"
          onPress={() => this.props.navigation.navigate("Configure")}
        />
      </View>
    );
  }
}
