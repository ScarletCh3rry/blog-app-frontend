type Func = (...args: any) => void
type Voidify<T extends Func> = (...args: Parameters<T>) => void

export const debounce = <T extends Func>(action: T, time: number): Voidify<T> => {
    let timeout = null as any | null

    return (...args: Parameters<T>) => {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => action(...args), time)
    }
}