import dotenv from "dotenv"
dotenv.config()
const config = () => {
  return {
    api: {
      apiUrl: process.env.REACT_APP_API_URL,
    },
  };
};

export default config;
