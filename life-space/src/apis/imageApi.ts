import Cookies from "js-cookie";
import axiosClient from "./axiosClient";
const baseUrl = "/image";
export const imageApi = {
	createOne: (data: any) => {
		const token = Cookies.get("token");
		return axiosClient.post(`${baseUrl}/`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
				"content-type": "multipart/form-data",
			},
		});
	},
};
