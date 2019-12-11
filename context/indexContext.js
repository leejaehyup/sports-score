import React, {Component, createContext} from "react";
import {sundryState, minus, plus} from "./SundryContext";

const Context = createContext();
const {Provider, Consumer: SundryConsumer, ScoreConsumer} = Context;

// Provider 에서 state 를 사용하기 위해서 컴포넌트를 새로 만들어줍니다.
class IndexProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sundryState,
      getScoreTime: props.getScoreTime
    };
    // 여기서 actions 라는 객체는 우리가 임의로 설정하는 객체입니다.
    // 나중에 변화를 일으키는 함수들을 전달해줄때, 함수 하나하나 일일히 전달하는 것이 아니라,
    // 객체 하나로 한꺼번에 전달하기 위함입니다.
    this.actions = {plus, minus};
  }

  render() {
    const {state, actions} = this;
    // Provider 내에서 사용할 값은, "value" 라고 부릅니다.
    // 현재 컴포넌트의 state 와 actions 객체를 넣은 객체를 만들어서,
    // Provider 의 value 값으로 사용하겠습니다.
    const value = {state, actions};

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}
function gameInfoScore(WrappedComponent) {
  return function UseScoreProvider(props) {
    return (
      <ScoreConsumer>
        {({state, actions}) => (
          <WrappedComponent value_1={state.value_1} value_2={state.value_2} />
        )}
      </ScoreConsumer>
    );
  };
}
function scoreButton(WrappedComponent) {
  return function UseScoreProvider(props) {
    return (
      <ScoreConsumer>
        {({state, actions}) => (
          <WrappedComponent
            value={state.value}
            value_1={state.value_1}
            value_2={state.value_2}
            plus={actions.plus}
            minus={actions.minus}
            i={state.i}
            score={state.score[++state.i % 3]}
            // user1, user2 나누기
            user={state.i % 6 < 3 ? "user1" : "user2"}
            getScoreTime={state.getScoreTime}
          />
        )}
      </ScoreConsumer>
    );
  };
}

// 내보내줍니다.
export {IndexProvider, scoreButton, gameInfoScore};
