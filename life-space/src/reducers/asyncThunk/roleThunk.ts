/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { roleApi } from "apis/roleApi";
import { AxiosError } from "axios";
export const roleGetOne = createAsyncThunk("role/roleGetOne", async (data, { rejectWithValue }) => {
	try {
		const response = await roleApi.getOne(data);
		return response.data;
	} catch (error: AxiosError | any) {
		return rejectWithValue(error.data);
	}
});
export const roleGetAll = createAsyncThunk("role/roleGetAll", async (_data, { rejectWithValue }) => {
	try {
		const response = await roleApi.getAll();
		return response.data;
	} catch (error: AxiosError | any) {
		return rejectWithValue(error.data);
	}
});
