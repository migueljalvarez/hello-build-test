import React from "react";
import { Container, Button } from "react-bootstrap";
import { counterPages } from "../utils/counterPage";
const PaginateButtons = ({
  customClass,
  handleClickPrev,
  handleClickNext,
  disabledPrev,
  disabledNext,
  totalCount,
  limit,
  page,
}) => {
  return (
    <Container className={customClass}>
      <Button
        variant="dark"
        className="mx-2"
        disabled={disabledPrev}
        onClick={handleClickPrev}
      >
        {"Prev"}
      </Button>
      <h4>Page: {counterPages(page, totalCount, limit)}</h4>
      <Button
        variant="dark"
        className="mx-2"
        disabled={disabledNext}
        onClick={handleClickNext}
      >
        {"Next"}
      </Button>
    </Container>
  );
};

export default PaginateButtons;
