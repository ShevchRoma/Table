import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./slices/authSlice/authSlice";
import tableSlice from "./slices/tableSlice/tableSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        table: tableSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch