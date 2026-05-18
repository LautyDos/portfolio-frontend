import type { UserDto } from "@/entities/user/model/types";
import type { AddUserTechnologyRequest } from "@/features/add-user-technology/model/types";
import { httpClient } from "@/shared/api/httpClient";
import { cookies } from "next/headers";

export async function POST(request: Request){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) return Response.json({error: 'No autenticado'}, {status: 401})
    
    const body: AddUserTechnologyRequest = await request.json()

    try {
        const me = await httpClient<UserDto>('/auth/me', {token})
        await httpClient(`/users/${me.id}/technologies`, {
            method: 'POST',
            body: JSON. stringify({technologyId: body.technologyId}),
            token,
        })
        return Response.json({ok: true})
    } catch{
        return Response.json({error: 'Error al asociar la tecnología'}, {status: 500})
    }
}