import { createAsyncThunk } from "@reduxjs/toolkit";
import { imageApi } from "apis/imageApi";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";
import { logOut } from "reducers/userSlice";

export const imageCreateOne = createAsyncThunk(
	"image/imageCreateOne",
	async (data: any, { dispatch, rejectWithValue }) => {
		try {
			const response = await imageApi.createOne(data);
			return response.data;
		} catch (error: AxiosError | any) {
			console.log("error: ", error.data);
			// error.status = 403 && dispatch(logOut());
			return rejectWithValue(error.data);
		}
	}
);
