import { types } from "../types/types";
import {
  get,
  addToFavoritesRepositories,
  getFavoritesRepositories,
  nextFavoritesList,
  prevFavoritesList,
} from "../../services/repositories";
import Swal from "sweetalert2";

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
        totalCount: repositories.totalCount,
      },
    });
  };
};

const addToFav = (data) => {
  return (dispatch) => {
    addToFavoritesRepositories(data).then((favRepository) => {
      if (favRepository) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${favRepository.name} was added to your favorites`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
};
const getFav = (limit, opt) => {
  return (dispatch) => {
    switch (opt) {
      case "next":
        return nextFavoritesList(limit, dispatch, types);
      case "previous":
        return prevFavoritesList(limit, dispatch, types);
      default:
        return getFavoritesRepositories(limit, dispatch, types);
    }
  };
};
export { getRepositories, addToFav, getFav };
