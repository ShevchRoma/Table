import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TableData, fetchTable } from "./asyncActions";
import { TableTypes } from "./tableTypes";

const initialState: TableTypes = {
    tableData: [],
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTable.pending, (state) => {

        })
        builder.addCase(fetchTable.fulfilled, (state, action: PayloadAction<TableData>) => {
            state.tableData = action.payload.results
        })
        builder.addCase(fetchTable.rejected, (state) => {

        })
    }
})

export default tableSlice.reducer;