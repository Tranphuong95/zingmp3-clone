import axios from "axios";

const API_BASE = "http://localhost:8080/api/auth/";
type RegisterType = {
    userName: string,
    email: string,
    phoneNumber: number,
    password: string,
}
type LoginType = { email: string, password: string }
const register = ({ userName, email, phoneNumber, password }: RegisterType) => {
    return axios.post(API_BASE + "singup", {
        userName, email, phoneNumber, password
    })
};
const login = ({ email, password }:LoginType) => {
    return axios.post(API_BASE+"signin", {
        email, password
    }).then(res=>{
        if(res.data.accessToken){
            localStorage.setItem("profile", JSON.stringify(res.data))
        }
        return res.data
    })
};
const logout=()=>{
    localStorage.removeItem("profile")
};
const AuthService={
    register, login, logout
};
export default AuthService;
