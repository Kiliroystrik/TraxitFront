export type IFormMap<T> = {
    [K in keyof T]?: any;
}