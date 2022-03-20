import {api} from "./axios-instance";
import {Post, PostRelations} from "../types/PostItem";
import {Paginated} from "../types/Paginated";
import {createQuery} from "../utils/createQuery";

class PostsAPI {
    getAllPosts = (page: number, tags: string[], owner: string | undefined, search: string | null, blogSlug: string | undefined) => api.get<Paginated<Post>>(`blogs/posts/?${createQuery({tags, owner, search, page})
        //createSearchParams(owner ? {tags, owner} : search ? {tags, search} : {tags})
        }`).then(res => res.data)
    setPostLike = (postId: number, like: boolean) => api.put<PostRelations>(`blogs/like-posts/${postId}/`, {like}).then(res => res.data)
}


export const postsAPI = new PostsAPI()