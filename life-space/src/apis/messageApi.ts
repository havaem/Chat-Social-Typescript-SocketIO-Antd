import Cookies from "js-cookie";
import axiosClient from "./axiosClient";
const baseUrl = "/message";
export const messageApi = {
	createOne: (data: any) => {
		const token = Cookies.get("token");
		return axiosClient.post(`${baseUrl}/`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
				"content-type": "multipart/form-data",
			},
		});
	},
	getAllFromConversation: (id: string) => {
		return axiosClient.get(`${baseUrl}/conversation/${id}`);
	},
	deleteOne: (data: any) => {
		return axiosClient.delete(`${baseUrl}/`, data);
	},
	updateOne: (data: any) => {
		return axiosClient.put(`${baseUrl}/`, data);
	},
	deleteAll: (id: string) => {
		return axiosClient.delete(`${baseUrl}/conversation/${id}`);
	},
};
