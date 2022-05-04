import {action, makeAutoObservable} from "mobx";
import {usersAPI} from "../API/usersAPI";
import {authStore} from "./AuthStore";

export type UserProfile = {
    login: string,
    email: string,
    last_login: string,
    date_joined: string,
    avatar: FileList,
    posts_count: number,
    id: number,
    subscription_status: boolean
}

class UserProfileStore {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    get isOwnProfile() {
        return this.user?.login === authStore.user?.name
    }

    user: UserProfile | null = null
    isLoading = true
    error: string | null = null

    fetchUserProfile(login: string) {
        this.isLoading = true
        return usersAPI.getUser(login)
            .then(
                action(
                    'setUserProfile',
                    (user) => this.user = user
                )
            )
            .catch(
                action(
                    'failedProfileFetching',
                    (e) => console.log(e)
                )
            )
            .finally(
                action(
                    'endProfileFetching',
                    () => this.isLoading = false
                )
            )
    }

    editUserProfile(login: string, payload: FormData) {
        return usersAPI.editUser(login, payload)
            .then(
                action(
                    'editUserProfile',
                    (data) => {
                        this.user!.login = data.login
                        this.user!.email = data.email
                        this.user!.avatar = data.avatar
                        authStore.refresh()
                    }
                )
            )
    }

}

export const userProfileStore = new UserProfileStore();