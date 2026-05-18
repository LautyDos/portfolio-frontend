import type { UserDto } from "@/entities/user/model/types";
import { httpClient } from "@/shared/api/httpClient";
import { cookies } from "next/headers";

export async function DELETE(_request: Request, {params}:{params: Promise<{linkId: string}>}){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) return Response.json({error: 'No autenticado'}, {status: 401})

    const {linkId} = await params

    try {
        const me = await httpClient<UserDto>('/auth/me', {token})
        await httpClient(`/users/${me.id}/links/${linkId}`, {
            method: 'DELETE',
            token,
        })
        return Response.json({ok: true})
    } catch{
        return Response.json({error: 'Error al eliminar el link'}, {status: 500})
    }
}