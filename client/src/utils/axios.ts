import axios from "axios";

const axiosConfig = {
  baseURL: `${import.meta.env.VITE_PRODUCTION_BACK_URL}/`,
  withCredentials: true
}

export const makeRequest = axios.create(axiosConfig)
