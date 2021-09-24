import axios from "../utils/axios";
import queryUser from "../graphql/user";
const url = "https://api.github.com/graphql";
const get = async () => {
  const username = localStorage.getItem("screenName");
  if (username) {
    const result = await axios.post(url, {
      query: queryUser(username),
    });

    const { data } = result.data;
    const user = data.user;
    return user;
  }
};

export { get };
