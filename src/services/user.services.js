import axios from 'axios';

const API_URL = 'http://localhost:5000/';

const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem("access_token");

        if (access_token) {

            config.headers['Authorization'] = access_token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (err) => {
        const originalConfig = err.config;

        const refresh_token = localStorage.getItem('refresh_token');

        if (refresh_token) {

            if (originalConfig.url !== "/auth/refresh" && err.response) {

                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const response = await axiosInstance.post("/auth/refresh", {refresh_token});
                        localStorage.setItem('access_token', response.data.access_token);
                        localStorage.setItem('refresh_token', response.data.refres_token);
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        if (_error.response.status === 401) {
                            localStorage.clear();
                            return window.location.href = '/authorization'
                        }
                        return Promise.reject(_error);
                    }
                }
            }
        }
        return Promise.reject(err);
    }
);

const authUser = (data) => axiosInstance.post(`${API_URL}auth`, data);
const logOutUser = () => axiosInstance.post(`${API_URL}auth/logout`);

const getAllUsers = () => axiosInstance.get(`${API_URL}users`);
const createUser = (data) => axiosInstance.post(`${API_URL}users`, data);
const updateUserById = (user_id, data) => axiosInstance.patch(`${API_URL}users/${user_id}`, data);
const deleteUserById = (user_id) => axiosInstance.delete(`${API_URL}users/${user_id}`);

export {
    getAllUsers,
    createUser,
    updateUserById,
    deleteUserById,

    authUser,
    logOutUser
}
