export type Paginated<T> = {
    results: T[]
    next: null
    previous: null /* TODO: add typing for next and prev */
    count: number
}
