import { cookies } from "next/headers";
import { UserDto } from "../../../../entities/user/model/types";
import { httpClient } from "../../../../shared/api/httpClient";

export async function POST(request: Request){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if(!token) return Response.json({error: 'No autenticado'}, {status: 401})

    const me = await httpClient<UserDto>(`/auth/me`, {token})

    const formData = await request.formData()

    try{
        await httpClient(`/users/${me.id}/avatar`, {
            method: 'POST',
            body: formData,
            token,
        })
        return Response.json({ok: true})
    } catch{
        return Response.json({error: 'Error al subir avatar'}, {status: 500})
    }
}