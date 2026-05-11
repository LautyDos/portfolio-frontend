import { cookies } from "next/headers"
import { httpClient } from "@/shared/api/httpClient"

export async function PATCH(request: Request, {params}: {params: Promise<{id: string}>}){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if(!token) return Response.json({error: 'No autenticado'}, {status: 401})

    const {id} = await params
    const body = await request.json()

    try{
        await httpClient(`/projects/${id}/featured`, {
            method: 'PATCH',
            body: JSON.stringify(body),
            token,
        })
        return Response.json({ok: true})
    } catch{
        return Response.json({error: 'Error al actualizar featured'}, {status: 500})
    }
}
