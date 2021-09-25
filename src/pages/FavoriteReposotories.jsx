import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import RepositoryLists from "../components/RepositoryLists";
import { useDispatch, useSelector } from "react-redux";
import { getFav } from "../redux/actions/repositioryAction";
import UserInfo from "../components/UserInfo";
const limit = 10;
const FavoriteReposotories = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const repositories = useSelector((state) => state.favRepositories);

  const handleNext = () => {
    let currentPage = page + 1;
    const opt = "next";
    dispatch(getFav(limit, opt));
    setPage(currentPage);
  };

  const handlePrev = () => {
    let currentPage = page - 1;
    const opt = "previous";
    dispatch(getFav(limit, opt));
    setPage(currentPage);
  };

  useEffect(() => {
    dispatch(getFav(limit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Container className="my-5">
      <UserInfo repositories={repositories.totalCount} />
      <Container>
        <Container className="d-flex align-items-center justify-content-between">
          <h1>Favorites Repositories</h1>
          <h4>
            Page: {page}/{Math.ceil(repositories.totalCount / limit) || 1}
          </h4>
        </Container>
        <RepositoryLists
          repositories={repositories.lists}
          isFavoriteList={true}
        />
      </Container>
      <Container className="d-flex justify-content-center">
        <Button
          variant="dark"
          className="m-5"
          disabled={page === 1}
          onClick={handlePrev}
        >
          {"< Prev"}
        </Button>
        <Button
          variant="dark"
          className="m-5"
          disabled={page === Math.ceil(repositories.totalCount / limit)}
          onClick={handleNext}
        >
          {"Next >"}
        </Button>
      </Container>
    </Container>
  );
};

export default FavoriteReposotories;
