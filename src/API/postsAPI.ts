import {api} from "./axios-instance";
import {Post, PostRelations, SubscriptionRelations} from "../types/PostItem";
import {Paginated} from "../types/Paginated";
import {createQuery} from "../utils/createQuery";

class PostsAPI {
    getAllPosts = (page: number, tags: string[], owner: string | undefined, search: string | null, blogSlug: string | undefined) => api.get<Paginated<Post>>(`blogs/posts/?${createQuery({tags, owner, search, page, blogSlug})
        //createSearchParams(owner ? {tags, owner} : search ? {tags, search} : {tags})
        }`).then(res => res.data)

    setPostLike = (postId: number, like: boolean) => api.put<PostRelations>(`blogs/like-posts/${postId}/`, {like}).then(res => res.data)

    getSubscribedPosts = (page: number, user: string, search: string | null,  tags: string[]) => {
        return api.get<Paginated<Post>>(`blogs/${user}/subscriptions/?${createQuery({tags, search, page})}`)
            .then(res => res.data)
    }

    setSubscription = (user_who_subscribed: string, user_you_subscribed_to: string, subscription_status: boolean) => {
        return api.put<SubscriptionRelations>(`blogs/${user_you_subscribed_to}/subscription-update/`, {subscription_status}).then(res => res.data)
    }

    getPost = (login: string, blogSlug:string, postSlug:string) => {
        return api.get<Post>(`blogs/${login}/${blogSlug}/${postSlug}/`)
            .then(res => res.data)
    }

    deletePost = (login: string, blogSlug:string, postSlug:string) => {
        return api.delete(`blogs/${login}/${blogSlug}/${postSlug}/delete-post/`)
    }
}


export const postsAPI = new PostsAPI()