import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.38.76.39:8080",
});

export default instance;
