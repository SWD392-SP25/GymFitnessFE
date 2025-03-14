// import axios from "axios";
// import { toast } from "react-toastify";
// import { API_BASE_URL } from "../../config";

// const instance = axios.create({
//   baseURL: `${API_BASE_URL}`,
// });

// instance.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   function (response) {
//     return response.data ? response.data : { statusCode: response.status };
//   },
//   function (error) {
//     if (error.response && error.response.status === 401) {
//       localStorage.clear();
//       localStorage.setItem("sessionExpired", "true");
//       window.location.href = routes.login;
//     } else if (error.response) {
//       console.error("Response error:", error.response);
//     } else if (error.request) {
//       console.error("Request error:", error.request);
//       toast.error("Không thể kết nối đến server. Vui lòng thử lại sau");
//     } else {
//       console.error("Error:", error.message);
//       toast.error("Đã xảy ra lỗi. Vui lòng thử lại");
//     }
//     return Promise.reject(error);
//   }
// );

// export default instance;


import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config";
import { refreshTokenAPI } from "./UsersService"; // API làm mới token

const instance = axios.create({
  baseURL: `${API_BASE_URL}`,
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response.data ?? { statusCode: response.status },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        localStorage.clear();
        localStorage.setItem("sessionExpired", "true");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await refreshTokenAPI({
          accessToken: localStorage.getItem("token"),
          refreshToken: refreshToken,
        });

        const newAccessToken = response.accessToken;
        localStorage.setItem("token", newAccessToken);
        onRefreshed(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        localStorage.setItem("sessionExpired", "true");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    toast.error("Đã xảy ra lỗi. Vui lòng thử lại");
    return Promise.reject(error);
  }
);

export default instance;
