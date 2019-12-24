import React, {Component, createContext} from "react";

const Context = createContext();
const {Provider, Consumer: ScoreConsumer} = Context;

// Provider 에서 state 를 사용하기 위해서 컴포넌트를 새로 만들어줍니다.
class ScoreProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      value_1: 0, // user1 score
      value_2: 0, // user2 score
      score: [2, 3, 4], // score
      i: -1, // index
      user: "", // user id
      getScoreTime: 3, // 점수를 득점하기 위한 시간
      //잡다한 점수들
      penalty_index: 0, // index
      advantage_index: 0, // index
      penalty_1: 0,
      advantage_1: 0,
      penalty_2: 0,
      advantage_2: 0
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
        if (user.trim() === "user1") {
          if (this.state.value_1 < value) {
            return;
          }
          this.setState(prevState => ({
            value_1: prevState.value_1 - value
          }));
        } else {
          if (this.state.value_2 < value) {
            return;
          }
          this.setState(prevState => ({value_2: prevState.value_2 - value}));
        }
      },
      advantage_plus: user => {
        if (user.trim() === "user1")
          this.setState(prevState => ({
            advantage_1: prevState.advantage_1 + 1
          }));
        else
          this.setState(prevState => ({
            advantage_2: prevState.advantage_2 + 1
          }));
      },
      advantage_minus: user => {
        if (user.trim() === "user1") {
          if (this.state.advantage_1 <= 0) return;
          this.setState(prevState => ({
            advantage_1: prevState.advantage_1 - 1
          }));
        } else {
          if (this.state.advantage_2 <= 0) return;
          this.setState(prevState => ({
            advantage_2: prevState.advantage_2 - 1
          }));
        }
      },
      penalty_plus: user => {
        //console.log(this.state.sundry.penalty_1);
        if (user.trim() === "user1") {
          this.setState(prevState => ({
            penalty_1: prevState.penalty_1 + 1
          }));
        } else
          this.setState(prevState => ({
            penalty_2: prevState.penalty_2 + 1
          }));
      },
      penalty_minus: user => {
        if (user.trim() === "user1") {
          if (this.state.penalty_1 <= 0) return;
          this.setState(prevState => ({
            penalty_1: prevState.penalty_1 - 1
          }));
        } else {
          if (this.state.penalty_2 <= 0) return;
          this.setState(prevState => ({
            penalty_2: prevState.penalty_2 - 1
          }));
        }
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

function gameLog(WrappedComponent) {
  return function UseScoreProvider(props) {
    return (
      <ScoreConsumer>
        {({state, actions}) => (
          <WrappedComponent
            value_1={state.value_1}
            value_2={state.value_2}
            penalty_1={state.penalty_1}
            penalty_2={state.penalty_2}
            advantage_1={state.advantage_1}
            advantage_2={state.advantage_2}
          />
        )}
      </ScoreConsumer>
    );
  };
}
function gameInfoScore(WrappedComponent) {
  return function UseScoreProvider(props) {
    return (
      <ScoreConsumer>
        {({state, actions}) => (
          <WrappedComponent
            value_1={state.value_1}
            value_2={state.value_2}
            penalty_1={state.penalty_1}
            penalty_2={state.penalty_2}
            advantage_1={state.advantage_1}
            advantage_2={state.advantage_2}
          />
        )}
      </ScoreConsumer>
    );
  };
}
function penaltyScore(WrappedComponent) {
  return function UseScoreProvider(props) {
    return (
      <ScoreConsumer>
        {({state, actions}) => (
          <WrappedComponent
            penalty_plus={actions.penalty_plus}
            penalty_minus={actions.penalty_minus}
            user={state.penalty_index % 2 < 1 ? "user1" : "user2"}
            value={state.score[++state.penalty_index % 3]}
          />
        )}
      </ScoreConsumer>
    );
  };
}
function advantageScore(WrappedComponent) {
  return function UseScoreProvider(props) {
    return (
      <ScoreConsumer>
        {({state, actions}) => (
          <WrappedComponent
            advantage_minus={actions.advantage_minus}
            advantage_plus={actions.advantage_plus}
            user={state.advantage_index % 2 < 1 ? "user1" : "user2"}
            value={state.score[++state.advantage_index % 3]}
          />
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
export {
  ScoreProvider,
  ScoreConsumer,
  gameInfoScore,
  scoreButton,
  advantageScore,
  penaltyScore,
  gameLog
};
