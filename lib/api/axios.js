import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.38.76.39:8080",
});

instance.interceptors.request.use(
  config => {
    const aCookieValue = document.cookie
      .split("; ")
      .find(row => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (aCookieValue) {
      config.headers["Authorization"] = `Bearer ${aCookieValue}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
