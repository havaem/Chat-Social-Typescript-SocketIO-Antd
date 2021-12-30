/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { conversationApi } from "apis/conversationApi";
import { AxiosError } from "axios";
export const conversationGetOne = createAsyncThunk(
	"conversation/conversationGetOne",
	async (data: string, { rejectWithValue }) => {
		try {
			const response = await conversationApi.getOne(data);
			return response.data;
		} catch (error: AxiosError | any) {
			return rejectWithValue(error.data);
		}
	}
);
export const conversationUpdateOne = createAsyncThunk(
	"conversation/conversationGetOne",
	async (data: any, { rejectWithValue }) => {
		try {
			const response = await conversationApi.updateOne(data);
			return response.data;
		} catch (error: AxiosError | any) {
			return rejectWithValue(error.data);
		}
	}
);
