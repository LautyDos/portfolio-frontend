import type { LoginRequest } from "../model/types";


export async function loginApi(credentials: LoginRequest): Promise<void>{
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
    })

    if(!res.ok){
        throw new Error('Credenciales inválidas')
    }
}