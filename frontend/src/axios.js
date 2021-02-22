import axios from "axios";
import axiosRetry from "axios-retry";

const instance = axios.create({
  timeout: 2500,
  baseURL: "http://localhost:9000",
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});

axiosRetry(instance, {
  retries: 2,
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.code === "ECONNABORTED"
    );
  },
  retryDelay: axiosRetry.exponentialDelay,
  shouldResetTimeout: true
});

export default instance;
