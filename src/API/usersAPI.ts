import {Paginated} from "../types/Paginated"
import {User} from "../types/User"
import {api} from "./axios-instance"


class UsersAPI {
    getAllUsers = () => api.get<Paginated<User[]>>('users/').then(res => res.data)
    getUser = (login: string) => api.get<User>(`user-profile/${login}/`).then(res => res.data)
}

export const usersAPI = new UsersAPI()