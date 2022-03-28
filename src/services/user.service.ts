// import axios from "axios";
// import authHeader from "./auth-header.service";
// const API_URL="http://localhost:8080/api/";

// const getPublicContent=()=>{
//     return axios.get(API_URL+"all")
// };
// const getUserBoard = () => {
//     return axios.get(API_URL + "user", { headers: authHeader() });
//   };
//   const getModeratorBoard = () => {
//     return axios.get(API_URL + "mod", { headers: authHeader() });
//   };
//   const getAdminBoard = () => {
//     return axios.get(API_URL + "admin", { headers: authHeader() });
//   };
//   const userService = {
//     getPublicContent,
//     getUserBoard,
//     getModeratorBoard,
//     getAdminBoard,
//   };
//   export default userService

import api from "./api"

const API_URL="http://localhost:8080/api/";

const getPublicContent=()=>{
    return api.get(API_URL+"all")
};
const getUserBoard = () => {
    return api.get(API_URL + "user");
  };
  const getModeratorBoard = () => {
    return api.get(API_URL + "mod");
  };
  const getAdminBoard = () => {
    return api.get(API_URL + "admin");
  };
  const userService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
  };
  export default userService