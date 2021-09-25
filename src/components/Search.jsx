import React from "react";
import { useDispatch } from "react-redux";
import { Form, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
const Search = ({
  filter,
  searchTerm,
  handleSearch,
  placeholder,
  customClass,
  limit,
  cursor,
}) => {
  const dispatch = useDispatch();

  const search = (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      dispatch(filter(searchTerm.toUpperCase(), limit, cursor));
    }
  };
  return (
    <div className={customClass}>
      <Form className="d-flex mx-5 w-100">
        <FormControl
          type="search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={placeholder}
        />
        <Button
          variant="success"
          className="d-flex align-items-center"
          onClick={search}
        >
          <FaSearch />
        </Button>
      </Form>
    </div>
  );
};

export default Search;
