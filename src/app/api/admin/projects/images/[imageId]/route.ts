import { cookies } from "next/headers"
import { httpClient } from "@/shared/api/httpClient"

export async function PATCH(request: Request, {params}: {params: Promise<{imageId: string}>}){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) return Response.json({error: 'No autenticado'}, {status: 401})

    const {imageId} = await params
    const body = await request.json()

    try{
        await httpClient(`/media/projects/images/${imageId}`, {
            method: 'PATCH',
            body: JSON.stringify(body),
            token,
        })
        return Response.json({ok: true})
    } catch {
        return Response.json({error: 'Error al actualizar la imagen'}, {status: 500})
    }
}

export async function DELETE(_request: Request, { params }: {params: Promise<{imageId: string}>}){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) return Response.json({error: 'No autenticado'}, {status: 401})

    const {imageId} = await params

    try {
        await httpClient(`/media/projects/images/${imageId}`, {method: 'DELETE', token})
        return Response.json({ok: true})
    } catch {
        return Response.json({error: 'Error al eliminar la imagen'}, {status: 500})
    }
}
