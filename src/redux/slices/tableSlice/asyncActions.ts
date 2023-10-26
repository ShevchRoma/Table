import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TableCellType } from "./tableTypes";

export interface TableData {
    count: number
    next: string
    previous: boolean
    results: TableCellType[]
}

export const fetchTable = createAsyncThunk<TableData>('table/fetchTableStatus', async () => {

    const response = await axios.get<TableData>(
        `https://technical-task-api.icapgroupgmbh.com/api/table/`)

    return response.data
})