import axios from "axios";

const axiosConfig = {
  baseURL: 'http://localhost:8000/',
  withCredentials: true
}

export const makeRequest = axios.create(axiosConfig)
