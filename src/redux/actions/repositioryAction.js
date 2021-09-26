import { types } from "../types/types";
import {
  get,
  addToFavoritesRepositories,
  getFavoritesRepositories,
  nextFavoritesList,
  prevFavoritesList,
  removeFavoritesRepositories,
  searchRepositories,
  searchFavoriteRepositoriesOnFirestore,
} from "../../services/repositories";
import Swal from "sweetalert2";

const getRepositories = (limit, cursor) => {
  return async (dispatch) => {
    try {
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
    } catch (error) {
      console.log("error");
    }
  };
};

const addToFav = (user, data) => {
  return () => {
    addToFavoritesRepositories(user, data)
      .then((favRepository) => {
        if (favRepository) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${favRepository.name} was added to your favorites`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: err,
          showConfirmButton: true,
        });
      });
  };
};
const getFav = (user, limit, opt) => {
  return (dispatch) => {
    switch (opt) {
      case "next":
        return nextFavoritesList(user, limit, dispatch, types);
      case "previous":
        return prevFavoritesList(user, limit, dispatch, types);
      default:
        return getFavoritesRepositories(user, limit, dispatch, types);
    }
  };
};
const removeFav = (user, id) => {
  return (dispatch) => {
    removeFavoritesRepositories(id)
      .then((data) => {
        if (data.deleted) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `this repository was removed from your favorites`,
            showConfirmButton: false,
            timer: 1500,
          });
          return getFavoritesRepositories(user, 10, dispatch, types);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const searchGithubRepositories = (searchText, limit, cursor) => {
  return async (dispatch) => {
    return searchRepositories(searchText, limit, cursor).then(
      (repositories) => {
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
      }
    );
  };
};
const searchFavoritesRepositories = (searchText, limit) => {
  return (dispatch) => {
    return searchFavoriteRepositoriesOnFirestore(
      searchText,
      limit,
      dispatch,
      types
    );
  };
};
export {
  getRepositories,
  addToFav,
  getFav,
  removeFav,
  searchGithubRepositories,
  searchFavoritesRepositories,
};
