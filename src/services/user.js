import axios from "axios";
import queryUser from "../graphql/user";
const url = "https://api.github.com/graphql";
const get = async () => {
  const username = localStorage.getItem("screenName");
  if (username) {
    const result = await axios.post(
      url,
      {
        query: queryUser(username),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "github-access-token"
          )}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = result.data;
    const user = data.user;
    return user;
  }
};

export { get };
