import {createSearchParams} from "react-router-dom";

export const createQuery = (obj: any) => {
    const result = {} as any
    for (const[key, value] of Object.entries(obj))
    {
        if (value){
            result[key] = value
        }
    }
    return createSearchParams(result)
}