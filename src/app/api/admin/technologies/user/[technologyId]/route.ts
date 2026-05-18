import type { UserDto } from "@/entities/user/model/types";
import { httpClient } from "@/shared/api/httpClient";
import { cookies } from "next/headers";

export async function DELETE(request: Request, {params}: {params: Promise<{technologyId: string}>}){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) return Response.json({error: 'No autenticado'}, {status: 401})

    const { technologyId } = await params

    try {
        const me = await httpClient<UserDto>('/auth/me', {token})
        await httpClient(`/users/${me.id}/technologies/${technologyId}`, {
            method: 'DELETE',
            token,
        })
        return Response.json({ok: true})
    } catch{
        return Response.json({error: 'Error al desasociar la tecnología'}, {status: 500})
    }
}