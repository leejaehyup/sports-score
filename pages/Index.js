import React from "react";
import {View, Text, Button} from "react-native";

export default class IndexScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        {/* <View style={{marginTop: 20}}>
          <Text style={{textAlign: "center"}}>추가된 것</Text>
          <Text style={{fontSize: 15}}>
            1. 3초동안 자세 유지 시 점수 득점 인정이 되기 때문에 각 점수 버튼
            클릭 시 타이머 추가
          </Text>
          <Text style={{fontSize: 15}}>2. 총점 추가 </Text>
          <Text style={{fontSize: 15}}>3. 게임 시간 설정 페이지 추가</Text>
          <Text style={{textAlign: "center"}}>해야 할 것</Text>
          <Text style={{fontSize: 15}}>1. 플리이어 이름 추가</Text>
          <Text style={{fontSize: 15}}>2. 타이머 리셋 버튼</Text>
        </View> */}
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text>sports score</Text>
          <Button
            title="Go configure screen"
            onPress={() => this.props.navigation.navigate("Game")}
          />
        </View>
      </View>
    );
  }
}
