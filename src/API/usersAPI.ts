import {Paginated} from "../types/Paginated"
import {User} from "../types/User"
import {api} from "./axios-instance"

export type EditUserPayload = {
    login: string,
    email: string
}

class UsersAPI {
    getAllUsers = () => api.get<Paginated<User>>('users/').then(res => res.data)
    getUser = (login: string) => api.get<User>(`user-profile/${login}/`).then(res => res.data)
    editUser = (login: string, payload: EditUserPayload) => api.patch<EditUserPayload>(`user-profile/${login}/edit/`, payload).then(res => res.data)
    // editUserAvatar = () =>
}

export const usersAPI = new UsersAPI()