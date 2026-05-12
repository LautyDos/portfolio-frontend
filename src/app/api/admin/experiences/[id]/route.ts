import type { EditExperienceRequest } from "@/features/edit-experience/model/types"
import { httpClient } from "@/shared/api/httpClient"
import { cookies } from "next/headers"


export async function PUT(request: Request, {params}: {params: Promise<{id: string}>}){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) return Response.json({error: 'No autenticado'}, {status: 401})
    
    const {id} = await params
    const body: EditExperienceRequest = await request.json()

    try {
        await httpClient(`/experiences/${id}`, {method: 'PUT', body: JSON.stringify(body), token})
        return Response.json({ok: true})
    } catch {
        return Response.json({error: 'Error al actualizar la experiencia'}, {status: 500})
    }
}

export async function DELETE(_request: Request, {params}: {params: Promise<{id: string}>}){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) return Response.json({error: 'No autenticado'}, {status: 401})

    const {id} = await params

    try {
        await httpClient(`/experiences/${id}`, {method: 'DELETE', token})
        return Response.json({ok: true})
    } catch {
        return Response.json({error: 'Error al eliminar la experiencia'}, {status: 500})
    }
}