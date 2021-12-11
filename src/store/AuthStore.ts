import {makeAutoObservable} from "mobx";
import jwtDecode from "jwt-decode";
import {authAPI} from "../API/authAPI";
import {AuthForm} from "../components/Pages/AuthPage";

type DecodedToken = {
    user_id: number
    name: string
    exp: number
}

export type AuthenticatedUser = {
    id: number
    name: string
}

export const ACCESS_TOKEN = 'access_token'
export const REFRESH_TOKEN = 'refresh_token'

const isDeprecated = (exp: number) => exp * 1000 < Date.now()

class AuthStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    user: AuthenticatedUser | null = null
    isLoading = true

    get isAuth() {
        return !!this.user
    }

    checkAuth = () => {
        this.isLoading = true
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            this.isLoading = false
            return
        }
        const tokenDeprecated = this.loginByToken(token)
        tokenDeprecated && this.refresh()
    }

    loginByToken = (token: string) => {
        const {name, user_id, exp} = jwtDecode<DecodedToken>(token)
        if (isDeprecated(exp)) {
            return true
        }
        this.user = {id: user_id, name}
        this.isLoading = false
        setTimeout(this.refresh, 1000 * 60 * 4)
    }

    refresh = () => {
        return authAPI.refresh(localStorage.getItem(REFRESH_TOKEN) || '')
            .then(data => {
                localStorage.setItem(ACCESS_TOKEN, data.access)
                this.loginByToken(data.access)
            }).catch(() => this.isLoading = false)
    }

    login = async (data: AuthForm) => {
        const {access, refresh} = await authAPI.login(data.login, data.password)
        localStorage.setItem(ACCESS_TOKEN, access)
        localStorage.setItem(REFRESH_TOKEN, refresh)
        this.loginByToken(access)
    }

    logout = () => {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        this.user = null
        this.isLoading = false
    }
}


export const authStore = new AuthStore()