import axiosClient from "./axiosClient";
const baseUrl = "/conversation";
export const conversationApi = {
	getOne: (data: any) => {
		return axiosClient.get(`${baseUrl}/${data}`);
	},
	updateOne(data: any) {
		return axiosClient.put(`${baseUrl}/${data.id}`, data.data);
	},
};
