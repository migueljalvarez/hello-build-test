import React from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginWithGithub } from "../redux/actions/authAction";
import { FaGithub } from "react-icons/fa";
const Login = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(loginWithGithub());
  };
  return (
    <Container
      className="d-flex flex-column col col-lg-3 col-md-6 col-sm-12"
      style={{
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <p className="text-center m-0">Do you have Github account?</p>

      <Button className="d-flex w-100 my-2 justify-content-center align-items-center" variant="dark" onClick={handleLogin}>
        <FaGithub size="24" style={{margin: "0 10px"}}/>
        Continue with Github
      </Button>
      <p className="text-center m-0">Sign In or sign up here up</p>
    </Container>
  );
};

export default Login;
