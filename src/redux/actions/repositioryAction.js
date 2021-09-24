import { types } from "../types/types";
import { get } from "../../services/repositories";

const getRepositories = (limit, cursor) => {
  return async (dispatch) => {
    const repositories = await get(limit, cursor);
    dispatch({
      type: types.repositories,
      payload: {
        lists: repositories.lists,
        startCursor: repositories.pageInfo.startCursor,
        hasPrev: repositories.pageInfo.hasPreviousPage,
        hasNext: repositories.pageInfo.hasNextPage,
        endCursor: repositories.pageInfo.endCursor,
        totalCount: repositories.totalCount
      }
    })
  };
};

export { getRepositories };
