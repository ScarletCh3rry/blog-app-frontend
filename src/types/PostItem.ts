export type Post = {
    title: string
    description: string
    tags: Tag[]
    creation_date: string
    likes_count: number
    comments_count: number
    quizzes_count: number
    views_count: number
    blog: Blog
    id: number
    is_liked: boolean
}

export type Tag = {
    name: string
    slug: string
    id: number
}

export type Blog = {
    title: string
    owner: User
    description: string
    slug: string
}

export type FullBlog = Blog & {
    posts: Post[]
}

export type User = {
    login: string
    avatar: string
}

export type PostRelations = {
    "like": boolean,
    "watched": boolean
}