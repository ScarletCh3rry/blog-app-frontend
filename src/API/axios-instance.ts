import axios from "axios";
import {ACCESS_TOKEN} from "../store/AuthStore";


export const api = axios.create({
    baseURL: 'https://cherry-blog-backend.herokuapp.com/api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
        config!.headers!.Authorization = `Bearer ${token}`
    }
    return config
})