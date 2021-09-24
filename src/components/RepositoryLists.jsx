import React from "react";
import { Container } from "react-bootstrap";
import CardRepository from "./CardRepository";

const RepositoryLists = ({ repositories }) => {
  return (
    <Container className="d-flex flex-wrap  justify-content-center">
      {repositories?.length > 0 ? (
        repositories.map((repository) => (
          <CardRepository key={repository.id} repository={repository} />
        ))
      ) : (
        <></>
      )}
    </Container>
  );
};

export default RepositoryLists;
