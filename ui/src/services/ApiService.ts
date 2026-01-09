import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IApiService {
  get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  post<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  put<T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
}

class ApiService implements IApiService {
	private baseUrl: string;
	axiosInstance: AxiosInstance
	isMockTest: boolean = false;

	constructor(baseUrl: string, config?: AxiosRequestConfig, isMockTest: boolean = false) {
		this.baseUrl = baseUrl;
		this.axiosInstance = axios.create({
			baseURL: this.baseUrl,
			...config,
		});
		this.isMockTest = isMockTest || process.env.MOCK_TEST === "true"
	}

	async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.get<T>(endpoint, config);
	}

	async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.post<T>(endpoint, data, config);
	}

	async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.put<T>(endpoint, data, config);
	}

	async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		return this.axiosInstance.delete<T>(endpoint, config);
	}	

}

export default ApiService;

