import React, {Component, createContext} from "react";

const Context = createContext();
const {Provider, Consumer: ScoreConsumer} = Context;

// Provider 에서 state 를 사용하기 위해서 컴포넌트를 새로 만들어줍니다.
class ScoreProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      value_1: 0,
      value_2: 0,
      score: [2, 3, 4],
      i: -1,
      user: ""
    };
    // 여기서 actions 라는 객체는 우리가 임의로 설정하는 객체입니다.
    // 나중에 변화를 일으키는 함수들을 전달해줄때, 함수 하나하나 일일히 전달하는 것이 아니라,
    // 객체 하나로 한꺼번에 전달하기 위함입니다.
    this.actions = {
      plus: (user, value) => {
        if (user.trim() === "user1")
          this.setState(prevState => ({value_1: prevState.value_1 + value}));
        else this.setState(prevState => ({value_2: prevState.value_2 + value}));
      },
      minus: (user, value) => {
        if (user.trim() === "user1")
          this.setState(prevState => ({
            value_1: prevState.value_1 - value
          }));
        else this.setState(prevState => ({value_2: prevState.value_2 - value}));
      }
    };
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
function withScore(WrappedComponent) {
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
function totalScore(WrappedComponent) {
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
          />
        )

        /* {({state, actions}) => {
          if (state.i > 4) state.i = -1;
          if (state.i < 2) {
            console.log(state.i);
            <WrappedComponent
              value_1={state.value_1}
              plus={actions.plus}
              minus={actions.minus}
              i={state.i}
              score={state.score[++state.i % 3]}
              user="user1"
            />;
          } else {
            console.log(state.i);
            <WrappedComponent
              value_2={state.value_2}
              plus={actions.plus}
              minus={actions.minus}
              i={state.i}
              score={state.score[++state.i % 3]}
              user="user2"
            />;
          }
        }} */
        }
      </ScoreConsumer>
    );
  };
}

// 내보내줍니다.
export {ScoreProvider, ScoreConsumer, withScore, totalScore};
