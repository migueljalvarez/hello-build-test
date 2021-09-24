import axios from "../utils/axios";
import queryRepository from "../graphql/repositories.js";
const url = "https://api.github.com/graphql";
const get = async (limit, cursor) => {
  const result = await axios.post(url, {
    query: queryRepository(limit, cursor),
  });

  const { data } = result.data;
  const { repositories } = data.viewer;
  return repositories;
};

export { get };
