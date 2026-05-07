import { cookies } from "next/headers";
import type { LoginRequest, LoginResponse } from "../../../../features/login/model/types";
import { httpClient } from "../../../../shared/api/httpClient";

export async function POST(request: Request){
    const body: LoginRequest = await request.json()

    let data: LoginResponse

    try{
        data = await httpClient<LoginResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(body),
        })
    } catch {
        return Response.json({error: 'Credenciales inválidas'}, {status: 401})
    }

    const cookieStore = await cookies()
    cookieStore.set('auth_token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    })

    return Response.json({ ok: true })
}