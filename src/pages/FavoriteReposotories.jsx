import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import RepositoryLists from "../components/RepositoryLists";
import { getFav } from "../redux/actions/repositioryAction";
import PaginateButtons from "../components/PaginateButtons";
import { totalPages } from "../utils/counterPage";
import Search from "../components/Search";
import { searchFavoritesRepositories } from "../redux/actions/repositioryAction";
import UserInfo from "../components/UserInfo";
const limit = 10;

const FavoriteReposotories = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      dispatch(getFav(limit));
    }
    setSearchTerm(e.target.value);
  };
  return (
    <Container className="my-5">
      <UserInfo />
      <Container className="d-flex align-items-center justify-content-between head-fav-repositories">
        <Container className="d-flex justify-content-start head-fav-repositories">
          <h1>Favorites Repositories</h1>
        </Container>
        <Search
          filter={searchFavoritesRepositories}
          placeholder="Search favorites repositories"
          customClass="d-flex w-100"
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          limit={limit}
        />
      </Container>
      <RepositoryLists repositories={repositories.lists} />
      <PaginateButtons
        customClass="d-flex justify-content-center py-5 paginate"
        handleClickPrev={handlePrev}
        handleClickNext={handleNext}
        disabledPrev={page === 1}
        disabledNext={page === totalPages(repositories.totalCount, limit)}
        page={page}
        totalCount={repositories.totalCount}
        limit={limit}
      />
    </Container>
  );
};

export default FavoriteReposotories;
