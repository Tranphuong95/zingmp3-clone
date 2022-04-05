// import axios from "axios";
import { filtersObject } from "@/until/filterObject";
import api from "./api";
import { AUTH_URL } from "@/config/urlConfig";
import { LoginType, RegisterType } from "@/features/auth/auth";

// type RegisterType = {
//     userName: string,
//     email: string,
//     phoneNumber: number,
//     password: string,
// }
// type LoginType = { email: string, password: string, remember: boolean}
const register = ({ userName, email, phoneNumber, password }: RegisterType) => {
    console.log(api)
    return api.post(AUTH_URL + "signup", {
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
const login = ({ email, password, remember }: LoginType) => {
    return api.post(AUTH_URL + "signin", {
        email, password, remember
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
