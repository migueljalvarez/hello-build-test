import { types } from "../types/types";

const repositoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.repositories:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export { repositoriesReducer };
