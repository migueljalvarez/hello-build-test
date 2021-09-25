import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import RepositoryLists from "../components/RepositoryLists";
import { getFav } from "../redux/actions/repositioryAction";
import UserInfo from "../components/UserInfo";
import PaginateButtons from "../components/PaginateButtons";
import { totalPages } from "../utils/counterPage";
import Search from "../components/Search";
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
          <Container className="d-flex justify-content-start">
            <h1>Favorites Repositories</h1>
          </Container>

          <Search
            placeholder="Search favorites repositories"
            customClass="d-flex justify-content-center w-100"
          />
          <PaginateButtons
            customClass="d-flex justify-content-end"
            handleClickPrev={handlePrev}
            handleClickNext={handleNext}
            disabledPrev={page === 1}
            disabledNext={
              page ===
              (typeof totalPages(repositories.totalCount, limit) === "number")
                ? totalPages(repositories.totalCount, limit)
                : 1
            }
            page={page}
            totalCount={repositories.totalCount}
            limit={limit}
          />
        </Container>
        <RepositoryLists repositories={repositories.lists} />
      </Container>
      <PaginateButtons
        customClass="d-flex justify-content-center py-5"
        handleClickPrev={handlePrev}
        handleClickNext={handleNext}
        disabledPrev={page === 1}
        disabledNext={
          page ===
          (typeof totalPages(repositories.totalCount, limit) === "number")
            ? totalPages(repositories.totalCount, limit)
            : 1
        }
        page={page}
        totalCount={repositories.totalCount}
        limit={limit}
      />
    </Container>
  );
};

export default FavoriteReposotories;
