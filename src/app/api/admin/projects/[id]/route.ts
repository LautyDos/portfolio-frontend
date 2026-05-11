import { cookies } from "next/headers";
import type { EditProjectRequest } from "../../../../../features/edit-project/model/types";
import { httpClient } from "../../../../../shared/api/httpClient";

export async function PUT(request: Request, {params}: {params: Promise<{id: string}>}){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if(!token) return Response.json({error: 'No autenticado'}, {status: 401})

    const {id} = await params

    const body: EditProjectRequest = await request.json()

    try {
        await httpClient(`/projects/${id}`, {method: 'PUT', body: JSON.stringify(body), token})
        return Response.json({ok: true})
    } catch {
        return Response.json({error: 'Error al actualizar el proyecto'}, {status: 500})
    }
}

export async function DELETE(_request: Request, {params}: {params: Promise<{id: string}>}){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) return Response.json({error: 'No autenticado'}, {status: 401})

    const { id } = await params

    try{
        await httpClient(`/projects/${id}`, {method: 'DELETE', token})
        return Response.json({ok: true})
    } catch{
        return Response.json({error: 'Error al eliminar el proyecto'}, {status: 500})
    }
}
