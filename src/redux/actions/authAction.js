import { types } from "../types/types";
import {
  GithubProvider,
  auth,
  signInWithPopup,
  GithubAuthProvider,
} from "../../config/firebase/firebaseConfig";

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
        dispatch(login(user));
      })
      .catch((error) => {
        console.error(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  };
};

export { loginWithGithub, login };
