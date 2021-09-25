import React from "react";
import { Container } from "react-bootstrap";
import CardRepository from "./CardRepository";
import { useLocation } from "react-router-dom";
const RepositoryLists = ({ repositories }) => {
  const location = useLocation();

  return (
    <Container className="d-flex flex-wrap  justify-content-center">
      {repositories?.length > 0 ? (
        repositories.map((repository) => (
          <CardRepository
            key={repository.isFav ? repository.repositoryId : repository.id}
            repository={repository}
          />
        ))
      ) : (
        <>
          {location.pathname.split("/")[1] === "favorites" ? (
            <h3>This account not have favorites repositories</h3>
          ) : (
            <h3>This account not have repositories</h3>
          )}
        </>
      )}
    </Container>
  );
};

export default RepositoryLists;
