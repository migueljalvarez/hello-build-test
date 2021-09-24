import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_8IZGSsN3BhhTF_jRr5X6_7IKOKKhjOc",
  authDomain: "hello-build-test-app.firebaseapp.com",
  projectId: "hello-build-test-app",
  storageBucket: "hello-build-test-app.appspot.com",
  messagingSenderId: "900992879998",
  appId: "1:900992879998:web:b4463127266f18c134b72f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const GithubProvider = new GithubAuthProvider();
const auth = getAuth(app)
export { auth, GithubProvider, signInWithPopup, GithubAuthProvider };
