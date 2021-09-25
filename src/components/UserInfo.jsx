import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { getUser } from "../redux/actions/userAction";
import { FaUserCheck, FaUserFriends, FaBook } from "react-icons/fa";

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Container className="d-flex my-5 flex-wrap align-items-center user-info-container">
      <img
        className="rounded-circle py-2"
        src={user.photoURL}
        alt={user.displayName}
        style={{ width: "200px" }}
      />
      <Container className="flex-start m-0 w-auto user-info-profile">
        <h2>{user.displayName}</h2>
        <h4 className="text-secondary">{user.username}</h4>
        <p className="my-0">{user.bio}</p>
        <p className="my-0">{user.location}</p>
        <Container className="d-flex p-0  user-info-counter">
          <p className="d-flex my-2 p-1 align-items-center">
            <FaBook size="24" style={{ margin: "0 5px" }} /> {user.repositories}
          </p>
          <p className="d-flex my-2 p-1 align-items-center">
            <FaUserFriends size="24" style={{ margin: "0 5px" }} />{" "}
            {user.followers}
          </p>
          <p className="d-flex my-2 p-1 align-items-center">
            <FaUserCheck size="24" style={{ margin: "0 5px" }} />{" "}
            {user.following}
          </p>
        </Container>
      </Container>
    </Container>
  );
};

export default UserInfo;
