import { messageApi } from "./../../apis/messageApi";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
export const messageGetAllFromConversation = createAsyncThunk(
	"message/messageGetAllFromConversation",
	async (data: string, { rejectWithValue }) => {
		try {
			const response = await messageApi.getAllFromConversation(data);
			return response.data;
		} catch (error: AxiosError | any) {
			return rejectWithValue(error.data);
		}
	}
);
export const messageCreateOne = createAsyncThunk(
	"message/messageCreateOne",
	async (data: any, { rejectWithValue }) => {
		try {
			const response = await messageApi.createOne(data);
			return response.data;
		} catch (error: AxiosError | any) {
			return rejectWithValue(error.data);
		}
	}
);
export const messageDeleteAll = createAsyncThunk(
	"message/messageDeleteAll",
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await messageApi.deleteAll(id);
			return response.data;
		} catch (error: AxiosError | any) {
			return rejectWithValue(error.data);
		}
	}
);
