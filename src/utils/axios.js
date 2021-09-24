import axios from "axios";
const token = localStorage.getItem("github-access-token");
const instance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
export default instance;
