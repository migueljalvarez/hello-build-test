import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaStar, FaEye } from "react-icons/fa";
const CardRepository = ({ repository }) => {
  return (
    <>
      <Card className="m-2" style={{ width: "18rem", height: "15rem" }}>
        <Card.Body>
          <Card.Title className="">{repository.name}</Card.Title>
          <Card.Text>
            {repository.description || "this repository not have description"}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-center bg-dark">
          <Card.Link
            className=" text-white"
            href={repository.url}
            target="_blank"
          >
            <FaEye />
          </Card.Link>
          <Button className=" d-flex align-items-center" variant="success">
            <FaStar />
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default CardRepository;
