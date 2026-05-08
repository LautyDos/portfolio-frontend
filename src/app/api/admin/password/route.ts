import { cookies } from "next/headers";
import type { UserDto } from "../../../../entities/user/model/types";
import type { ChangePasswordRequest } from "../../../../features/change-password/model/types";
import { httpClient } from "../../../../shared/api/httpClient";

export async function PUT(request: Request){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if(!token) return Response.json({error: 'No autenticado'}, {status: 401})

    const me = await httpClient<UserDto>(`/auth/me`, {token})
    const body: ChangePasswordRequest = await request.json()

    try{
        await httpClient(`/users/${me.id}/password`, {
            method: 'PUT',
            body:JSON.stringify(body),
            token,
        })
        return Response.json({ok: true})
    } catch{
        return Response.json({error: 'Contraseña actual incorrecta'}, {status: 400})
    }
}