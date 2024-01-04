import { CLEAR_CURRENT_USER, SET_CURRENT_USER } from '../types';

//리듀서 (1.새유저 업데이트 2.유저클리어 3.유저 그대로 유지)
const userReducer = (state = {}, action) => {
  switch (action?.type) {
    case SET_CURRENT_USER:
      localStorage.setItem('currentUser', JSON.stringify(action?.payload));
      return action?.payload;
    case CLEAR_CURRENT_USER:
      localStorage.removeItem('currentUser');
      return null;
    default:
      return JSON.parse(localStorage.getItem('currentUser'));
  }
};

export default userReducer;
