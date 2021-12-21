import {
	userChangePassword,
	userCurrent,
	userForgetPassword,
	userLogin,
	userLoginGoogle,
	userRegister,
	userResetPassword,
	userUpdate,
} from "./asyncThunk/userThunk";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
interface iUserSlice {
	data: {
		_id: string;
		username: string;
		name: string;
		email: string;
		slug: string;
		avatar: string;
		cover: string;
		bio: string;
		birthday: string;
		phone: string;
		level: string;
		sCoin: string;
		sExp: string;
		language: string;
		status: any;
	};
	isLoading: boolean;
}
const initialState: iUserSlice = {
	data: {
		_id: "",
		username: "",
		name: "",
		email: "",
		slug: "",
		avatar: "",
		cover: "",
		birthday: "",
		phone: "",
		bio: "",
		level: "",
		sCoin: "",
		sExp: "",
		language: "",
		status: {},
	},
	isLoading: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logOut: (state) => {
			state.data = initialState.data;
			state.isLoading = initialState.isLoading;
			Cookies.remove("token");
		},
	},
	extraReducers: (builder) => {
		builder.addCase(userRegister.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(userRegister.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(userRegister.rejected, (state) => {
			state.isLoading = false;
		});
		// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		builder.addCase(userLogin.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(userLogin.fulfilled, (state, { payload }: any) => {
			Cookies.set("token", payload.token);
			state.data = payload.user;
			state.isLoading = false;
			Cookies.set("language", state.data.language);
		});
		builder.addCase(userLogin.rejected, (state) => {
			state.isLoading = false;
		});
		// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		builder.addCase(userLoginGoogle.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(userLoginGoogle.fulfilled, (state, { payload }: any) => {
			Cookies.set("token", payload.token);
			state.data = payload.user;
			state.isLoading = false;
		});
		builder.addCase(userLoginGoogle.rejected, (state) => {
			state.isLoading = false;
		});
		// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		builder.addCase(userCurrent.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(userCurrent.fulfilled, (state, { payload }: any) => {
			Cookies.set("token", payload.token);
			state.data = payload.user;
			state.isLoading = false;
		});
		builder.addCase(userCurrent.rejected, (state) => {
			Cookies.remove("token");
			state.isLoading = false;
		});
		// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		builder.addCase(userResetPassword.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(userResetPassword.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(userResetPassword.rejected, (state) => {
			state.isLoading = false;
		});
		// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		builder.addCase(userForgetPassword.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(userForgetPassword.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(userForgetPassword.rejected, (state) => {
			state.isLoading = false;
		});
		// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		builder.addCase(userChangePassword.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(userChangePassword.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(userChangePassword.rejected, (state) => {
			state.isLoading = false;
		});
		// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
		builder.addCase(userUpdate.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(userUpdate.fulfilled, (state, { payload }: any) => {
			state.data = payload.user;
			state.isLoading = false;
			Cookies.set("language", state.data.language);
		});
		builder.addCase(userUpdate.rejected, (state) => {
			state.isLoading = false;
		});
		// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	},
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
