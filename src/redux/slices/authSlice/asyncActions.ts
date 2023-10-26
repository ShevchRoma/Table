import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserIsAuth {
    username: string;
    password: string
}

export interface AuthInfo {
    message: string
}

export const userAuth = createAsyncThunk<AuthInfo, UserIsAuth>('auth/fetchAuthStatus', async (params, { rejectWithValue }) => {
    const { username, password } = params
    try {
        const response = await axios
            .post(
                `https://technical-task-api.icapgroupgmbh.com/api/login/`,
                {
                    "username": `${username}`,
                    "password": `${password}`,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        return (await response.data) as AuthInfo
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})