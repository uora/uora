export interface Hash<T> {
  [name: string]: T
}

export type JSON = Hash<string | number | boolean | Date | JSON | JsonArray>

export type JsonArray = Array<string | number | boolean | Date | JSON | JsonArray>

export type MaybeArray<T> = T | T[]

export type MaybePromise<T> = T | Promise<T>

export type GetValue<T = any> = (name: string) => T

export type SetValue<T = any> = (name: string, value: T) => void
