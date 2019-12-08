import React from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import {TextInput} from "react-native-gesture-handler";

export default class ConfigureScreen extends React.Component {
  state = {
    minute: "",
    second: "",
    getScoreTime: "",
    user1: "",
    user2: ""
  };
  render() {
    const {minute, second, user1, user2, getScoreTime} = this.state;
    return (
      <View style={{flex: 1}}>
        <Text style={styles.configureText}>설정 페이지</Text>
        <Text style={styles.configureUser}>유저 설정하기</Text>
        <View style={styles.userContainer}>
          <Text>User:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={user1 => this.setState({user1})}
            value={this.state.user1}
            placeholder="User"
          />
          <Text>User:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={user2 => this.setState({user2})}
            value={this.state.user2}
            placeholder="User"
          />
        </View>
        <Text style={styles.configureTimer}>시간 설정하기</Text>
        <View style={styles.timerContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={minute => this.setState({minute})}
            value={this.state.minute}
            placeholder="minute"
          />
          <Text>분</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={second => this.setState({second})}
            value={this.state.second}
            placeholder="second"
          />
          <Text>초</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={getScoreTime => this.setState({getScoreTime})}
            value={this.state.getScoreTime}
            placeholder="getScoreTime"
          />
        </View>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Button
            title="Go game screen"
            onPress={() =>
              this.props.navigation.navigate("Game", {
                minute,
                second,
                user1,
                user2,
                getScoreTime
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  configureText: {
    textAlign: "center",
    fontSize: 30
  },
  configureUser: {
    textAlign: "center",
    fontSize: 20,
    color: "#6B66FF",
    marginTop: 30
  },
  configureTimer: {
    textAlign: "center",
    fontSize: 20,
    color: "#6B66FF",
    marginTop: 30
  },
  textInput: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    width: "40%"
  },
  userContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  timerContainer: {
    marginTop: 10,
    flexDirection: "column",
    alignItems: "center"
  }
});
