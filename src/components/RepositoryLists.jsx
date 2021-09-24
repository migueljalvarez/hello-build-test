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
        <>
          <h3>This account not have repositories</h3>
        </>
      )}
    </Container>
  );
};

export default RepositoryLists;
