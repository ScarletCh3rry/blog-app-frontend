import {api} from "./axios-instance";
import {Post, PostRelations} from "../types/PostItem";
import {createSearchParams} from "react-router-dom";
import {Paginated} from "../types/Paginated";

class PostsAPI {
    getAllPosts = (tags: string[], owner: string | undefined, search: string | null) => api.get<Paginated<Post[]>>(`blogs/posts/?${createSearchParams(
        owner ? {tags, owner} : search ? {tags, search} : {tags}
    )}`).then(res => res.data)
    setPostLike = (postId: number, like: boolean) => api.put<PostRelations>(`blogs/like-posts/${postId}/`, {like}).then(res => res.data)
}


export const postsAPI = new PostsAPI()