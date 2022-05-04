import { UserProfile } from "../store/UserProfileStore"
import {Paginated} from "../types/Paginated"
import {User} from "../types/User"
import {api} from "./axios-instance"

export type EditUserPayload = {
    login: string,
    email: string,
    avatar: FileList

}

class UsersAPI {
    getAllUsers = () => api.get<Paginated<User>>('users/').then(res => res.data)
    getUser = (login: string) => api.get<UserProfile>(`user-profile/${login}/`).then(res => res.data)
    editUser = (login: string, payload: FormData) => api.patch<EditUserPayload>(`user-profile/${login}/edit/`, payload).then(res => res.data)
    // editUserAvatar = () =>
}

export const usersAPI = new UsersAPI()