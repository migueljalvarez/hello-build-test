import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import RepositoryLists from "../components/RepositoryLists";
import {
  getRepositories,
  searchGithubRepositories,
} from "../redux/actions/repositioryAction";

import PaginateButtons from "../components/PaginateButtons";
import Search from "../components/Search";
import UserInfo from "../components/UserInfo";

const limit = 10;

const Repositories = () => {
  const [cursor, setCursor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [prev, setPrev] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const repositories = useSelector((state) => state.repositories);

  const handleNextCursor = () => {
    let currentPage = page + 1;
    setPrev(repositories.startCursor);
    setCursor(repositories.endCursor);
    setPage(currentPage);
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
  };
  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      dispatch(getRepositories(limit, cursor));
    }
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    dispatch(getRepositories(limit, cursor));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, dispatch]);

  return (
    <Container className="my-5">
      <UserInfo />
      <Container className="d-flex align-items-center justify-content-between head-fav-repositories">
        <Container className="d-flex justify-content-start">
          <h1>Repositories</h1>
        </Container>
        <Search
          filter={searchGithubRepositories}
          placeholder="Search repositories"
          customClass="d-flex justify-content-center w-100"
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          limit={limit}
          cursor={cursor}
        />
      </Container>
      <RepositoryLists repositories={repositories.lists} />

      <PaginateButtons
        customClass="d-flex justify-content-center paginate py-5"
        handleClickPrev={handlePrevCursor}
        handleClickNext={handleNextCursor}
        disabledPrev={!repositories.hasPrev}
        disabledNext={!repositories.hasNext}
        page={page}
        totalCount={repositories.totalCount}
        limit={limit}
      />
    </Container>
  );
};

export default Repositories;
