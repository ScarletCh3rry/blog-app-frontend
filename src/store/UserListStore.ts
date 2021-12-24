import {action, makeAutoObservable} from "mobx";
import {User} from "../types/User";
import {usersAPI} from "../API/usersAPI";


class UserList {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    users: User[] = []
    isLoading = false
    error: string | null = null

    fetchUsers() {
        this.isLoading = true
        return usersAPI.getAllUsers()
            .then(
                action(
                    'setUsers',
                    (paginatedUsers) => this.users = paginatedUsers.results
                )
            )
            .catch(
                action(
                    'failedUserFetching',
                    (error) => console.dir(error)
                )
            )
            .finally(
                action(
                    'fetchUsersEnd',
                    () => this.isLoading = false
                )
            )
    }
}

export const userListStore = new UserList();