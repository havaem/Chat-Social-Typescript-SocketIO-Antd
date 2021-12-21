import { iLogin } from "./../../models/userModels";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";
import { iRegister } from "./../../models/userModels";
import { userApi } from "./../../apis/userApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userRegister = createAsyncThunk(
	"user/userRegister",
	async (data: iRegister, { rejectWithValue }) => {
		try {
			const response = await userApi.register(data);
			return response.data;
		} catch (error: AxiosError | any) {
			return rejectWithValue(error.data);
		}
	}
);
export const userLogin = createAsyncThunk("user/userLogin", async (data: iLogin, { rejectWithValue }) => {
	try {
		const response = await userApi.login(data);
		return response.data;
	} catch (error: AxiosError | any) {
		return rejectWithValue(error.data);
	}
});
export const userLoginGoogle = createAsyncThunk(
	"user/userLoginGoogle",
	async (data: any, { rejectWithValue }) => {
		try {
			const response = await userApi.loginGoogle(data);
			return response.data;
		} catch (error: AxiosError | any) {
			return rejectWithValue(error.data);
		}
	}
);
export const userCurrent = createAsyncThunk("user/userCurrent", async (_data, { rejectWithValue }) => {
	try {
		const response = await userApi.currentUser();
		return response.data;
	} catch (error: AxiosError | any) {
		return rejectWithValue(error.data);
	}
});
export const userVerify = createAsyncThunk("user/userVerify", async (data: any, { rejectWithValue }) => {
	try {
		const response = await userApi.verify(data);
		return response.data;
	} catch (error: AxiosError | any) {
		return rejectWithValue(error.data);
	}
});
export const userForgetPassword = createAsyncThunk(
	"user/userForgetPassword",
	async (data: any, { rejectWithValue }) => {
		try {
			const response = await userApi.forgetPassword(data);
			return response.data;
		} catch (error: AxiosError | any) {
			return rejectWithValue(error.data);
		}
	}
);
export const userResetPassword = createAsyncThunk(
	"user/userResetPassword",
	async (data: any, { rejectWithValue }) => {
		try {
			const response = await userApi.resetPassword(data);
			return response.data;
		} catch (error: AxiosError | any) {
			return rejectWithValue(error.data);
		}
	}
);
export const userChangePassword = createAsyncThunk(
	"user/userChangePassword",
	async (data: any, { rejectWithValue }) => {
		try {
			const response = await userApi.changePassword(data);
			return response.data;
		} catch (error: AxiosError | any) {
			return rejectWithValue(error.data);
		}
	}
);
export const userUpdate = createAsyncThunk("user/userUpdate", async (data: any, { rejectWithValue }) => {
	try {
		const response = await userApi.update(data);
		return response.data;
	} catch (error: AxiosError | any) {
		return rejectWithValue(error.data);
	}
});
