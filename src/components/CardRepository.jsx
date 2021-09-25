import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaStar, FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToFav, removeFav } from "../redux/actions/repositioryAction";

const CardRepository = ({ repository }) => {
  const dispatch = useDispatch();
  const handleFav = (data) => {
    dispatch(addToFav(data));
  };

  const handleRemoveFav = (data) => {
    dispatch(removeFav(data.id));
  };

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
          <Button
            className=" d-flex align-items-center"
            variant="success"
            onClick={() =>
              repository.isFav
                ? handleRemoveFav(repository)
                : handleFav(repository)
            }
          >
            <FaStar color={repository.isFav ? "gold" : "white"} />
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default CardRepository;
