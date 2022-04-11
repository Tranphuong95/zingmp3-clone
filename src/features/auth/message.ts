import { createSlice } from "@reduxjs/toolkit";
export interface messageType{
    message: string
}
const initialState: messageType={
    message: ""
};
const messageSlice=createSlice({
    name: "message",
    initialState,
    reducers:{
        setMessage: (state, action)=>{
            // return state.message=action.payload
            return action.payload
        },
        clearMessage: ()=>{
            return initialState
        }
    }
});
const {reducer, actions}=messageSlice;
export const {setMessage, clearMessage}=actions;
export default reducer;