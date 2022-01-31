export const toObj = (query: any) => {
    const obj: any = {}
    for (const [key, value] of query.entries()){
        obj[key] = value
    }
    return obj
}