import { cookies } from "next/headers"
import type { UserDto } from "@/entities/user/model/types"
import type { EditProfileRequest } from "@/features/edit-profile/model/types"
import { httpClient } from "@/shared/api/httpClient"

export async function PUT(request: Request){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if(!token) return Response.json({error: 'No autenticado'}, {status: 401})

    const body: EditProfileRequest = await request.json()

    const me = await httpClient<UserDto>('/auth/me', {token})

    try{
        await httpClient(`/users/${me.id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            token,
        })
        return Response.json({ok: true})
    } catch {
        return Response.json({error: 'Error al actualizar perfil'}, {status: 500})
    }
}
