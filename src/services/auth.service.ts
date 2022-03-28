// import axios from "axios";
import api from "./api";

const API_BASE = "http://localhost:8080/api/auth/";
type RegisterType = {
    userName: string,
    email: string,
    phoneNumber: number,
    password: string,
}
type LoginType = { email: string, password: string }
const register = ({ userName, email, phoneNumber, password }: RegisterType) => {
    console.log(api)
    return api.post(API_BASE + "signup", {
        userName, email, phoneNumber, password
    }).then(res=>{
        if(res.data.accessToken){
            localStorage.setItem("profile", JSON.stringify(res.data))
        }
        return res.data;
    }).catch((err)=> console.log(err))
};
const login = ({ email, password }: LoginType) => {
    return api.post(API_BASE + "signin", {
        email, password
    }).then(res => {
        if (res.data.accessToken) {
            localStorage.setItem("profile", JSON.stringify(res.data))
        }
        return res.data
    })
    .catch((err)=> console.log(err))
};
const logout = () => {
    localStorage.removeItem("profile")
};
const AuthService = {
    register, login, logout
};
export default AuthService;
