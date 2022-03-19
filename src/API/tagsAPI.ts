import {api} from "./axios-instance";
import {Tag} from "../types/PostItem";
import { Paginated } from "../types/Paginated";

class TagsAPI {
    getAllTags = () => api.get<Paginated<Tag>>('blogs/tags/').then(res => res.data)
}


export const tagsAPI = new TagsAPI()