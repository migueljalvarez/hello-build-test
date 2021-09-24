import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { getUser } from "../redux/actions/userAction";
const UserInfo = ({ repositories }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <Container className="d-flex my-5 flex-wrap align-items-center">
      <img
        className="rounded-circle py-2"
        src={user.photoURL}
        alt={user.displayName}
        style={{ width: "200px" }}
      />
      <Container className="flex-start m-0 w-auto">
        <h2>{user.displayName}</h2>
        <h4 className="text-secondary">{user.username}</h4>
        <p className="my-0">{user.bio}</p>
        <p className="my-0">{user.location}</p>
        <Container className="d-flex p-0">
          <p className="my-2 p-1">Repositories: {repositories}</p>
          <p className="my-2 p-1">Followers: {user.followers}</p>
          <p className="my-2 p-1">Following: {user.following}</p>
        </Container>
      </Container>
    </Container>
  );
};

export default UserInfo;
