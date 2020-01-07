// Default State
const initialState = {
  totalScore_1: 0,
  advantage_1: 0,
  penalty_1: 0,
  totalScore_2: 0,
  advantage_2: 0,
  penalty_2: 0,
  highlight_1: false,
  highlight_2: false,
  timer: {
    min: 5,
    sec: 0
  },
  gameLog: [],
  player1: "player1",
  player2: "player2",
  gameStart: false,
  run_score_time: false
};
//---------//
// Actions //
//---------//
// player1
export const PLAYER1_INCREMENT = "PLAYER1_INCREMENT";
export const PLAYER1_DECREMENT = "PLAYER1_DECREMENT";
export const PLAYER1_ADVANTAGE_INCREMENT = "PLAYER1_ADVANTAGE_INCREMENT";
export const PLAYER1_PENALTY_INCREMENT = "PLAYER1_PENALTY_INCREMENT";
export const PLAYER1_ADVANTAGE_DECREMENT = "PLAYER1_ADVANTAGE_DECREMENT";
export const PLAYER1_PENALTY_DECREMENT = "PLAYER1_PENALTY_DECREMENT";

// player2
export const PLAYER2_INCREMENT = "PLAYER2_INCREMENT";
export const PLAYER2_DECREMENT = "PLAYER2_DECREMENT";
export const PLAYER2_ADVANTAGE_INCREMENT = "PLAYER2_ADVANTAGE_INCREMENT";
export const PLAYER2_PENALTY_INCREMENT = "PLAYER2_PENALTY_INCREMENT";
export const PLAYER2_ADVANTAGE_DECREMENT = "PLAYER2_ADVANTAGE_DECREMENT";
export const PLAYER2_PENALTY_DECREMENT = "PLAYER2_PENALTY_DECREMENT";

// timer
export const TIMER_LOADED = "TIMER_LOADED";

// player name
export const PLAYER1_NAME = "PLAYER1_NAME";
export const PLAYER2_NAME = "PLAYER2_NAME";

// game utils
export const GAME_LOG = "GAME_LOG";
export const GAME_RESET = "GAME_RESET";
export const GAME_START = "GAME_START";
export const GAME_LOG_DELETE = "GAME_LOG_DELETE";
export const GAME_STOP = "GAME_STOP";
export const RUN_SCORE_TIME_SUCCESS = "RUN_SCORE_TIME_SUCCESS";
export const RUN_SCORE_TIME_FAIL = "RUN_SCORE_TIME_FAIL";
const HIGHLIGHT_1_ON = "HIGHLIGHT_1_ON";
const HIGHLIGHT_2_ON = "HIGHLIGHT_2_ON";
const HIGHLIGHT_1_OFF = "HIGHLIGHT_1_OFF";
const HIGHLIGHT_2_OFF = "HIGHLIGHT_2_OFF";

// Action Functions//

// 점수 획득
export const increment = (user, value) => (dispatch, getState) => {
  if (user.trim() === getState().scoreGame.player1)
    dispatch({type: PLAYER1_INCREMENT, payload: value});
  else dispatch({type: PLAYER2_INCREMENT, payload: value});
};
// 점수 차감
export const decrement = (user, value) => (dispatch, getState) => {
  if (user.trim() === getState().scoreGame.player1) {
    if (getState().scoreGame.totalScore_1 < value) {
      return;
    }
    dispatch({type: PLAYER1_DECREMENT, payload: value});
  } else {
    if (getState().scoreGame.totalScore_2 < value) {
      return;
    }
    dispatch({type: PLAYER2_DECREMENT, payload: value});
  }
};

// 어드밴티지 획득
export const advantageIncrement = user => (dispatch, getState) => {
  if (user.trim() === getState().scoreGame.player1)
    dispatch({type: PLAYER1_ADVANTAGE_INCREMENT});
  else dispatch({type: PLAYER2_ADVANTAGE_INCREMENT});
};
// 어드밴티지 차감
export const advantageDecrement = user => (dispatch, getState) => {
  if (user.trim() === getState().scoreGame.player1)
    dispatch({type: PLAYER1_ADVANTAGE_DECREMENT});
  else dispatch({type: PLAYER2_ADVANTAGE_DECREMENT});
};

// 패널티 획득
export const penaltyIncrement = user => (dispatch, getState) => {
  if (user.trim() === getState().scoreGame.player1)
    dispatch({type: PLAYER1_PENALTY_INCREMENT});
  else dispatch({type: PLAYER2_PENALTY_INCREMENT});
};
// 패널티 차감
export const penaltyDecrement = user => (dispatch, getState) => {
  if (user.trim() === getState().scoreGame.player1)
    dispatch({type: PLAYER1_PENALTY_DECREMENT});
  else dispatch({type: PLAYER2_PENALTY_DECREMENT});
};

// 타이머 갱신
export const timerLoaded = timer => (dispatch, getState) => {
  dispatch({type: TIMER_LOADED, payload: timer});
};

// 플레이어 이름
export const playerName = (user, name) => (dispatch, getState) => {
  if (user.trim() === "user1") dispatch({type: PLAYER1_NAME, payload: name});
  else dispatch({type: PLAYER2_NAME, payload: name});
};
// 게임 로그
export const gameLog = log => (dispatch, getState) => {
  dispatch({type: GAME_LOG, payload: log});
};

// 로그 지우기
export const deleteLog = (player, scoreType, score, index) => (
  dispatch,
  getState
) => {
  if (scoreType === "s" && parseInt(score) > 0) {
    dispatch(decrement(player, score));
  } else if (scoreType === "a" && parseInt(score) > 0) {
    dispatch(advantageDecrement(player));
  } else if (scoreType === "p" && parseInt(score) > 0) {
    dispatch(penaltyDecrement(player));
    // } else if (scoreType === "p" && parseInt(score) < 0) {
    //   dispatch(penaltyIncrement(player));
  }
  dispatch({type: GAME_LOG_DELETE, payload: index});
};

// 하이라이팅 ON
export const highlighting_on = player => (dispatch, getState) => {
  if (player === getState().scoreGame.player1) {
    dispatch({type: HIGHLIGHT_1_ON});
  } else {
    dispatch({type: HIGHLIGHT_2_ON});
  }
};

// 하이라이팅 OFF
export const highlighting_off = player => (dispatch, getState) => {
  if (player === getState().scoreGame.player1) {
    dispatch({type: HIGHLIGHT_1_OFF});
  } else {
    dispatch({type: HIGHLIGHT_2_OFF});
  }
};

// 점수 시간 돌아가는지 여부
export const runScoreTimeSuccess = () => {
  return {
    type: RUN_SCORE_TIME_SUCCESS
  };
};
export const runScoreTimeFail = () => {
  return {
    type: RUN_SCORE_TIME_FAIL
  };
};

// 게임 리셋
export const gameReset = () => {
  return {
    type: GAME_RESET
  };
};
// 게임 시작
export const gameStart = () => {
  return {
    type: GAME_START
  };
};

// 게임 중지
export const gameStop = () => {
  return {
    type: GAME_STOP
  };
};

// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    // 점수 획득
    case PLAYER1_INCREMENT:
      return {
        ...state,
        totalScore_1: state.totalScore_1 + action.payload
      };
    case PLAYER2_INCREMENT:
      return {
        ...state,
        totalScore_2: state.totalScore_2 + action.payload
      };
    // 점수 차감
    case PLAYER1_DECREMENT:
      return {
        ...state,
        totalScore_1: state.totalScore_1 - action.payload
      };
    case PLAYER2_DECREMENT:
      return {
        ...state,
        totalScore_2: state.totalScore_2 - action.payload
      };
    // 어드밴티지 획득
    case PLAYER1_ADVANTAGE_INCREMENT:
      return {
        ...state,
        advantage_1: state.advantage_1 + 1
      };

    case PLAYER2_ADVANTAGE_INCREMENT:
      return {
        ...state,
        advantage_2: state.advantage_2 + 1
      };
    // 어드밴티지 차감
    case PLAYER1_ADVANTAGE_DECREMENT:
      return {
        ...state,
        advantage_1: state.advantage_1 - 1
      };

    case PLAYER2_ADVANTAGE_DECREMENT:
      return {
        ...state,
        advantage_2: state.advantage_2 - 1
      };
    // 패널티 획득
    case PLAYER1_PENALTY_INCREMENT:
      return {
        ...state,
        penalty_1: state.penalty_1 + 1
      };
    case PLAYER2_PENALTY_INCREMENT:
      return {
        ...state,
        penalty_2: state.penalty_2 + 1
      };
    // 패널티 차감
    case PLAYER1_PENALTY_DECREMENT:
      return {
        ...state,
        penalty_1: state.penalty_1 - 1
      };
    case PLAYER2_PENALTY_DECREMENT:
      return {
        ...state,
        penalty_2: state.penalty_2 - 1
      };

    // 타이머 갱신
    case TIMER_LOADED:
      return {
        ...state,
        timer: action.payload
      };
    // 플레이어 이름 갱신
    case PLAYER1_NAME:
      return {
        ...state,
        player1: action.payload
      };
    case PLAYER2_NAME:
      return {
        ...state,
        player2: action.payload
      };

    // 로그 갱신
    case GAME_LOG:
      return {
        ...state,
        gameLog: [action.payload, ...state.gameLog]
      };
    // 로그 지우기
    case GAME_LOG_DELETE:
      return {
        ...state,
        gameLog: state.gameLog.filter((log, index) => action.payload !== index)
      };

    // 게임 리셋
    case GAME_RESET:
      return {
        ...state,
        totalScore_1: 0,
        advantage_1: 0,
        penalty_1: 0,
        totalScore_2: 0,
        advantage_2: 0,
        penalty_2: 0,
        timer: {
          min: 5,
          sec: 0
        },
        gameLog: [],
        player1: "player1",
        player2: "player2",
        gameStart: false,
        log: []
      };

    //게임 시작
    case GAME_START:
      return {
        ...state,
        gameStart: true
      };
    //게임 중지
    case GAME_STOP:
      return {
        ...state,
        gameStart: false
      };

    // 점수 시간 돌아감
    case RUN_SCORE_TIME_SUCCESS:
      return {
        ...state,
        run_score_time: true
      };
    // 점수 시간 안 돔
    case RUN_SCORE_TIME_FAIL:
      return {
        ...state,
        run_score_time: false
      };

    // 하이라이팅 온
    case HIGHLIGHT_2_ON:
      return {
        ...state,
        highlight_2: true
      };
    case HIGHLIGHT_1_ON:
      return {
        ...state,
        highlight_1: true
      };
    // 하이라이팅 오프
    case HIGHLIGHT_2_OFF:
      return {
        ...state,
        highlight_2: false
      };
    case HIGHLIGHT_1_OFF:
      return {
        ...state,
        highlight_1: false
      };

    default:
      return state;
  }
}

// Exports Default
export default reducer;
