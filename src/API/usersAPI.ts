import { UserProfile } from "../store/UserProfileStore"
import {Paginated} from "../types/Paginated"
import {User} from "../types/User"
import {api} from "./axios-instance"
import {createQuery} from "../utils/createQuery";

export type EditUserPayload = {
    login: string,
    email: string,
    avatar: FileList

}

class UsersAPI {
    getAllUsers = (search:string) => api.get<Paginated<User>>(`users/?${createQuery({search})}`).then(res => res.data)
    getUser = (login: string) => api.get<UserProfile>(`user-profile/${login}/`).then(res => res.data)
    editUser = (login: string, payload: FormData) => api.patch<EditUserPayload>(`user-profile/${login}/edit/`, payload).then(res => res.data)
}

export const usersAPI = new UsersAPI()