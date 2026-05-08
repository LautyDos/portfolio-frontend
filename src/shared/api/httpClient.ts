import { env } from "../config/env";

interface RequestOptions extends RequestInit{
    token?: string;
}


export async function httpClient<T>(path: string, options: RequestOptions = {}): Promise<T>{
    const {token, ...init} = options;

    const isFormData = init.body instanceof FormData

    const headers: HeadersInit = {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init.headers ?? {}),
    }

    const res = await fetch(`${env.apiUrl}${path}`, {...init, headers})

    if(!res.ok){
        throw new Error(`HTTP ${res.status} - ${path}`)
    }

    const text = await res.text()
    if (!text) return undefined as T

    return JSON.parse(text) as T;
}
