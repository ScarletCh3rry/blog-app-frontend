import {action, makeAutoObservable} from "mobx";
import {EditUserPayload, usersAPI} from "../API/usersAPI";
import {User} from "../types/User";
import {authStore} from "./AuthStore";


class UserProfileStore {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    get isOwnProfile () {
        return this.user?.login === authStore.user?.name
    }

    user: User | null = null
    isLoading = false
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

    editUserProfile (login: string, payload: EditUserPayload) {
        return usersAPI.editUser(login, payload)
            .then(
                action(
                    'editUserProfile',
                    (data) => {
                        this.user!.login = data.login
                        this.user!.email = data.email
                    }
                )
            )
    }

}

export const userProfileStore = new UserProfileStore();