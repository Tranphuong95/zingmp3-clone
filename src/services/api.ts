import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import TokenService from "./token.service";
const baseURL="http://localhost:8080/";
const config:AxiosRequestConfig ={
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
}
const instance:AxiosInstance = axios.create(config);
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = TokenService.getLocalAccessToken();
    if (token && config?.headers) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
    
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig?.url !== "/api/auth/signin" && originalConfig?.url !== "/api/auth/signup" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.post("/auth/refreshtoken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });
          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;