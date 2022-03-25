// import { createSlice } from '@reduxjs/toolkit';
// import { createSlice, PayloadAction} from "@reduxjs/toolkit";

// export interface loginState {
//     // mail: string,
//     // password: string
//     token: string
//     loading: boolean
// };
// const initialState:loginState={
//     // mail: "",
//     // password: ""
//     token:"",
//     loading: false
// }
// export const LoginSlice=createSlice({
//     name: "login",
//     initialState,
//     reducers:{
//         login: (state)=>{
//             state.loading= true
//         }, 
//         loginSuccess: (state, action:PayloadAction<string>)=>{
//             state.token=action.payload;
//             state.loading=false;
//         },
//         loginFail:(state)=>{
//             state.loading=false
//         }
//     }
// });
// export default LoginSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import AuthService from './../../services/auth.service';

const user: {token: string}=JSON.parse(localStorage.getItem("profile")||"");
export interface RegisterType{
    userName: string,
    email: string,
    phoneNumber: number,
    password: string
};
export interface LoginType{
    email: string,
    password: string
};
interface AuthFeatureType{
    isLoggedIn: boolean,
    isLoading: boolean,
    user: any
}

export const register=createAsyncThunk(
    "auth/register",
    async({userName, email, phoneNumber, password}:RegisterType, thunkAPI)=>{
        try {
            const response=await AuthService.register({userName, email, phoneNumber, password});
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            if(error instanceof Error){
                const message=error?.message||error.toString();
                thunkAPI.dispatch(setMessage(message));
                return thunkAPI.rejectWithValue(message);
            }
        }
    }
);
export const login=createAsyncThunk(
    "auth/login",
    async({email, password}:LoginType, thunkAPI)=>{
        try {
            const data=await AuthService.login({email, password});
            return {
                user: data
            }
        } catch (error) {
            if(error instanceof Error){
                const message=error?.message||error.toString();
                thunkAPI.dispatch(setMessage(message));
                return thunkAPI.rejectWithValue(message);
            }
        }
    }
);
export const logout=createAsyncThunk("auth/logout",async () => {
    await AuthService.logout();
});
const initialState:AuthFeatureType=user?{isLoggedIn: true, user, isLoading: false}:{isLoggedIn:false, isLoading: false, user: {}};
const authSlice=createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(register.pending, (state, action)=>{
            state.isLoggedIn = false;
            // state.isLoading=true;
        }).addCase(register.fulfilled, (state, action)=>{
            state.isLoggedIn = false;
            // state.isLoading=false;
        }).addCase(register.rejected, (state, action)=>{
            state.isLoggedIn = false;
            // state.isLoading=false;
        }).addCase(login.pending, (state, action)=>{
            state.isLoggedIn = false;
            state.user=null;
            // state.isLoading=true;
        }).addCase(login.fulfilled, (state, action)=>{
            state.isLoggedIn = true;
            state.user=action.payload?.user;
            // state.isLoading=false;
        }).addCase(login.rejected, (state, action)=>{
            state.isLoggedIn = false;
            state.user=null;
            // state.isLoading=false;
        }).addCase(logout.pending, (state, action)=>{
            state.isLoggedIn = false;
            state.user=null;
            // state.isLoading=true;
        }).addCase(logout.fulfilled, (state, action)=>{
            state.isLoggedIn = false;
            state.user=null;
            // state.isLoading=false;
        }).addCase(logout.rejected, (state, action)=>{
            state.isLoggedIn = false;
            state.user=null;
            // state.isLoading=false;
        })
    }
});
const { reducer } = authSlice;
export default reducer;