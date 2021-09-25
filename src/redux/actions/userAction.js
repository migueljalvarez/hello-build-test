import { types } from "../types/types";
import { get } from "../../services/user";
const getUser = () => {
  return async (dispatch) => {
    const user = await get();
    dispatch({
      type: types.user,
      payload: {
        username: user.username,
        displayName: user.name,
        photoURL: user.avatarUrl,
        bio: user.bio,
        location: user.location,
        followers: user.followers.totalCount,
        following: user.following.totalCount,
        repositories: user.repositories.totalCount
      },
    });
  };
};
export { getUser };
