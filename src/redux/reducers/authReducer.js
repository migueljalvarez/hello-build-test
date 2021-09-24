import { types } from "../types/types";
const initialState = {
  isAuthenticated: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload,
      };
    case types.authenticated:
      return {
        isAuthenticated: true,
      };
    default:
      return state;
  }
};
export { authReducer };
