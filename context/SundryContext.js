import React from "react";

// Provider 에서 state 를 사용하기 위해서 컴포넌트를 새로 만들어줍니다.

export const sundryState = {
  value: 0,
  value_1: 0,
  value_2: 0,
  score: [2, 3, 4],
  i: -1,
  user: ""
};

export const plus = (user, value) => {
  if (user.trim() === "user1")
    this.setState(prevState => ({value_1: prevState.value_1 + value}));
  else this.setState(prevState => ({value_2: prevState.value_2 + value}));
};
export const minus = (user, value) => {
  if (user.trim() === "user1")
    this.setState(prevState => ({
      value_1: prevState.value_1 - value
    }));
  else this.setState(prevState => ({value_2: prevState.value_2 - value}));
};

export function gameInfoScore(WrappedComponent) {
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
export function scoreButton(WrappedComponent) {
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
