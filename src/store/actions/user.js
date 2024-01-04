import { CLEAR_CURRENT_USER, SET_CURRENT_USER } from "../types";

//액션을 만들어 리턴하는 함수
export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER,
  };
};
