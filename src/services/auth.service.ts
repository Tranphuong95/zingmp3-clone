// import axios from "axios";
import { filtersObject } from "@/until/filterObject";
import api from "./api";
import { AUTH_URL } from "@/config/urlConfig";
import { LoginType, RegisterType } from "@/features/auth/auth";
import TokenService from "./token.service";
import { toast } from "react-toastify";

const register = ({ userName, email, phoneNumber, password }: RegisterType) => {
    console.log(api)
    return api.post(AUTH_URL + "signup", {
        userName, email, phoneNumber, password
    }).then(res=>{
        // if(res.data.accessToken){
        //     const {accessToken, refreshToken}=res.data;
        //     const user=filtersObject(res.data.user, (key:string)=>key!=="password" && key!=="refreshToken");
        //     // localStorage.setItem("profile", JSON.stringify({user: user, accessToken, refreshToken}))
        //     TokenService.removeUser();
        //     TokenService.setUser({user: user, accessToken, refreshToken});
        //     toast.success(res.data.message)
        //     return {...res.data, user: filtersObject(res.data.user, (key:string, val: any)=>key!=="password" && key!=="refreshToken")};
        // }
        // else{
        //     toast.error("An occurred while register");
        // }
        if(res?.data?.message){
            toast.success(res.data.message)
        }
    }).catch((err)=> {console.log(err); toast.error(err.response.data.message); return {message: err.response.data.message}})
};
const login = ({ email, password, remember }: LoginType) => {
    return api.post(AUTH_URL + "signin", {
        email, password, remember
    }).then(res => {
        if (res.data.accessToken) {
            const {accessToken, refreshToken}=res.data;
            const user=filtersObject(res.data.user, (key:string, val: any)=>key!=="password" && key!=="refreshToken");
            TokenService.removeUser();
            TokenService.setUser({user: user, accessToken, refreshToken})
            toast.success(res.data.message)
            return {...res.data, user: filtersObject(res.data.user, (key:string, val: any)=>key!=="password" && key!=="refreshToken")}
        }
        else{
            toast.error("An occurred while login. Please try login again");
        }
    })
    .catch((err)=> {console.log(err); toast.error(err.response.data.message);return {message: err.response.data.message}})
};
const logout = () => {
    // TokenService.removeUser();
    TokenService.clearAll();
};
const AuthService = {
    register, login, logout
};
export default AuthService;
