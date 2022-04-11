import { configureStore, ThunkAction, Action, AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import authReducer from '../features/auth/auth';
import messageReducer from "../features/auth/message";

const combinedReducers = combineReducers({
    auth: authReducer,
    message: messageReducer
})
const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === "auth/logout") {
        state = {} as RootState
    }
    return combinedReducers(state, action)
}
export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducers>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>