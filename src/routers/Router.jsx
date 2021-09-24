import { Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Repositories from "../pages/Repositories";
import { PrivateRouter } from "./privateRouter";
import { PublicRouter } from "./publicRouter";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authAction";
const Routers = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  if (token !== null) {
    const user = jwtDecode(token);
    if (user) {
      dispatch(login(user));
    }
  }
  return (
    <Router>
      <NavBar />
      <Switch>
        <PrivateRouter exact path="/" component={Repositories} />
        <PublicRouter exact path="/login" component={Login} />
        <PublicRouter exact path="/signup" component={Signup} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default Routers;
