import axios, { AxiosError, AxiosResponse } from "axios";
import { APP_API } from "constant";

const axiosClient = axios.create({
	baseURL: APP_API,
});
axiosClient.interceptors.request.use(async (config) => {
	return config;
});
axiosClient.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError) => {
		throw error.response;
	}
);
export default axiosClient;
