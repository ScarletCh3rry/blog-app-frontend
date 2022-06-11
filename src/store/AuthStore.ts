import {makeAutoObservable} from "mobx";
import jwtDecode from "jwt-decode";
import {authAPI} from "../API/authAPI";
import { LoginForm } from "../components/Pages/LoginPage";
import {RegisterForm} from "../components/Pages/RegisterPage";
import {toast} from "react-toastify";

type DecodedToken = {
    user_id: number
    name: string
    exp: number
    avatar: string
}

export type AuthenticatedUser = {
    id: number
    name: string
    avatar: string
}

export const ACCESS_TOKEN = 'access_token'
export const REFRESH_TOKEN = 'refresh_token'

const isDeprecated = (exp: number) => exp * 1000 < Date.now()

class AuthStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    refreshTimeout: number | null = null
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
        const {name, user_id, exp, avatar} = jwtDecode<DecodedToken>(token)
        if (isDeprecated(exp)) {
            return true
        }
        this.user = {id: user_id, name, avatar}
        this.isLoading = false
        clearTimeout(this.refreshTimeout as any)
        this.refreshTimeout = setTimeout(this.refresh, 1000 * 60 * 4) as any
    }

    refresh = () => {
        return authAPI.refresh(localStorage.getItem(REFRESH_TOKEN) || '')
            .then(data => {
                localStorage.setItem(ACCESS_TOKEN, data.access)
                this.loginByToken(data.access)
            }).catch(() => this.isLoading = false)
    }

    login = async (data: LoginForm) => {
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

    async register(data: RegisterForm) {
        try {
            await authAPI.register(data.login, data.password, data.email)
        }
        catch (e: any) {
            console.dir(e)
            toast.error(`${e.response.data.login || e.response.data.password || e.response.data.login}`)
        }
    }
}


export const authStore = new AuthStore()