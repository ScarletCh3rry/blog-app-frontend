import {api} from "./axios-instance";

type LoginResponse = {
    refresh: string,
    access: string
}

type RefreshResponse = {
    access: string
}

class AuthAPI {
    login = (login: string, password: string) => {
        return api.post<LoginResponse>('token/', {login, password}).then(res => res.data)
    }
    refresh = (refresh: string) => {
        return api.post<RefreshResponse>('token/refresh/', {refresh}).then(res => res.data)
    }
}

export const authAPI = new AuthAPI()