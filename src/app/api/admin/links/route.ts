import type { UserLinkDto } from "@/entities/user-link/model/types";
import type { UserDto } from "@/entities/user/model/types";
import type { AddUserLinkRequest } from "@/features/add-user-link/model/types";
import { httpClient } from "@/shared/api/httpClient";
import { cookies } from "next/headers";

export async function POST(request: Request){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if(!token) return Response.json({error: 'No autenticado'}, {status: 401})
    
    const body: AddUserLinkRequest = await request.json()

    try {
        const me = await httpClient<UserDto>('/auth/me', { token })
        const link = await httpClient<UserLinkDto>(`/users/${me.id}/links`, {
            method:'POST',
            body: JSON.stringify(body),
            token,
        })
        return Response.json(link)
    } catch{
        return Response.json({error: 'Error al agregar el link'}, {status: 500})
    }
} 