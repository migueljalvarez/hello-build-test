import axios from "axios";
const instance = new axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("github-access-token")}`,
    "Content-Type": "application/json",
  },
});
export default instance;
