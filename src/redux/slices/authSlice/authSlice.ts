import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AuthInfo, userAuth } from "./asyncActions";
import { AuthState, StatusEnum } from "./authTypes";


const initialState: AuthState = {
    error: '',
    message: '',
    status: StatusEnum.STATUS_LOADING
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userAuth.pending, (state) => {
            state.status = StatusEnum.STATUS_LOADING
        })
        builder.addCase(userAuth.fulfilled, (state, action) => {
            state.message = action.payload.message
            state.status = StatusEnum.STATUS_SUCCESS
        })
        builder.addCase(userAuth.rejected, (state, action) => {
            state.status = StatusEnum.STATUS_ERROR
            state.error = action.payload
        })
    }
})

export const { setError } = authSlice.actions;

export default authSlice.reducer;