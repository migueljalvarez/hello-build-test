import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import RepositoryLists from "../components/RepositoryLists";
import { useDispatch, useSelector } from "react-redux";
import { getRepositories } from "../redux/actions/repositioryAction";
import UserInfo from "../components/UserInfo";
const limit = 10;
const Repositories = () => {
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prev, setPrev] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const repositories = useSelector((state) => state.repositories);

  const handleNextCursor = () => {
    let currentPage = page + 1;
    setPrev(repositories.startCursor);
    setCursor(repositories.endCursor);
    setPage(currentPage);
    setLoading(true);
  };

  const handlePrevCursor = () => {
    let currentPage = page - 1;
    if (currentPage > 1) {
      setPage(currentPage);
      setCursor(prev);
    }
    if (currentPage === 1) {
      setPage(1);
      setCursor(null);
    }
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      dispatch(getRepositories(limit, cursor));
      if (repositories.length > 0) {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, dispatch, loading]);

  return (
    <Container className="my-5">
      <UserInfo repositories={repositories.totalCount} />
      <Container>
        <Container className="d-flex align-items-center justify-content-between">
          <h1>Repositories</h1>
          <h4>
            Page: {page}/{Math.ceil(repositories.totalCount / limit)}
          </h4>
        </Container>
        <RepositoryLists repositories={repositories.lists} />
      </Container>
      <Container className="d-flex justify-content-center">
        <Button
          variant="dark"
          className="m-5"
          disabled={!repositories.hasPrev}
          onClick={handlePrevCursor}
        >
          {"< Prev"}
        </Button>
        <Button
          variant="dark"
          className="m-5"
          disabled={!repositories.hasNext}
          onClick={handleNextCursor}
        >
          {"Next >"}
        </Button>
      </Container>
    </Container>
  );
};

export default Repositories;
