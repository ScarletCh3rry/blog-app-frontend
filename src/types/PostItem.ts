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
}

export type Tag = {
    name: string
    slug: string
}

export type Blog = {
    title: string
    owner: User
}

export type User = {
    login: string
    avatar: string
}