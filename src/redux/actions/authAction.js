import { signOut, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { GithubProvider, auth } from "../../config/firebase/firebaseConfig";
import { types } from "../types/types";
import Swal from "sweetalert2";
const login = (user) => {
  return {
    type: types.login,
    payload: {
      uid: user.uid || user.user_id,
      displayName: user.displayName || user.name,
      email: user.email,
      photoURL: user.photoURL || user.picture,
    },
  };
};
const loginWithGithub = () => {
  return (dispatch) => {
    signInWithPopup(auth, GithubProvider)
      .then((result) => {
        const { user } = result;
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem("github-access-token", token);
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("screenName", user.reloadUserInfo.screenName);
        return user;
      })
      .then((user) => {
        localStorage.getItem("github-access-token");
        localStorage.getItem("token");
        localStorage.getItem("screenName");
        dispatch(login(user));
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: error,
          showConfirmButton: true,
        });
      });
  };
};
const logout = () => {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: types.logout,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
export { loginWithGithub, login, logout };
