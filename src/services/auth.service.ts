// import axios from "axios";
import { filtersObject } from "./../until/filterObject";
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
            const {accessToken, refreshToken}=res.data;
            const user=filtersObject(res.data.user, (key:string)=>key!=="password" && key!=="refreshToken");
            localStorage.setItem("profile", JSON.stringify({user: user, accessToken, refreshToken}))
        }
        return {...res.data, user: filtersObject(res.data.user, (key:string, val: any)=>key!=="password" && key!=="refreshToken")};
    }).catch((err)=> console.log(err))
};
const login = ({ email, password }: LoginType) => {
    return api.post(API_BASE + "signin", {
        email, password
    }).then(res => {
        if (res.data.accessToken) {
            const {accessToken, refreshToken}=res.data;
            const user=filtersObject(res.data.user, (key:string, val: any)=>key!=="password" && key!=="refreshToken");
            localStorage.setItem("profile", JSON.stringify({user: user, accessToken, refreshToken}))
        }
        return {...res.data, user: filtersObject(res.data.user, (key:string, val: any)=>key!=="password" && key!=="refreshToken")}
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
