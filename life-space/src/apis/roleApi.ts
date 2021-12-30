import axiosClient from "./axiosClient";
const baseUrl = "/role";
export const roleApi = {
	createOne: (data: any) => {
		return axiosClient.post(`${baseUrl}/`, data);
	},
	getAll: () => {
		return axiosClient.get(`${baseUrl}/`);
	},
	getOne: (data: any) => {
		return axiosClient.get(`${baseUrl}/`, data);
	},
	deleteOne: (data: any) => {
		return axiosClient.delete(`${baseUrl}/`, data);
	},
	updateOne: (data: any) => {
		return axiosClient.put(`${baseUrl}/`, data);
	},
};
