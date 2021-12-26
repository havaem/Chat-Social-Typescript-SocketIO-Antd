/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { socialApi } from "apis/socialApi";
import { AxiosError } from "axios";
export const socialGetOne = createAsyncThunk("social/socialGetOne", async (data, { rejectWithValue }) => {
	try {
		const response = await socialApi.getOne(data);
		return response.data;
	} catch (error: AxiosError | any) {
		return rejectWithValue(error.data);
	}
});
export const socialGetAll = createAsyncThunk("social/socialGetAll", async (_data, { rejectWithValue }) => {
	try {
		const response = await socialApi.getAll();
		return response.data;
	} catch (error: AxiosError | any) {
		return rejectWithValue(error.data);
	}
});
