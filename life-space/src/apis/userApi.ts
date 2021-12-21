import Cookies from "js-cookie";
import axiosClient from "./axiosClient";
const baseUrl = "/user";
export const userApi = {
	register: (data: any) => {
		return axiosClient.post(`${baseUrl}/register`, data);
	},
	login: (data: any) => {
		return axiosClient.post(`${baseUrl}/login`, data);
	},
	loginGoogle: (data: any) => {
		return axiosClient.post(`${baseUrl}/loginGoogle`, data);
	},
	currentUser: () => {
		const token = Cookies.get("token");
		return axiosClient.get(`${baseUrl}/`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	verify: (data: { token: string }) => {
		return axiosClient.post(`${baseUrl}/`, data);
	},
	forgetPassword: (data: any) => {
		return axiosClient.post(`${baseUrl}/password`, data);
	},
	resetPassword: (data: any) => {
		return axiosClient.put(`${baseUrl}/password`, data);
	},
	changePassword: (data: any) => {
		const token = Cookies.get("token");
		return axiosClient.patch(`${baseUrl}/password`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	update: (data: any) => {
		const token = Cookies.get("token");
		return axiosClient.put(`${baseUrl}/`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
};
