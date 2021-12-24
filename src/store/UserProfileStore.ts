import {action, makeAutoObservable} from "mobx";
import { usersAPI } from "../API/usersAPI";
import {User} from "../types/User";


class UserProfileStore {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
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

}

export const userProfileStore = new UserProfileStore();