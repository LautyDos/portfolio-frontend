import { cookies } from "next/headers"
import { httpClient } from "@/shared/api/httpClient"

export async function POST(request: Request, {params}: {params: Promise<{id: string}>}){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) return Response.json({error: 'No autenticado'}, {status: 401})

    const {id} = await params
    const formData = await request.formData()

    try {
        await httpClient(`/media/projects/${id}`, {method: 'POST', body: formData, token})
        return Response.json({ok: true})
    } catch{
        return Response.json({error: 'Error al subir la imagen'}, {status: 500})
    }
}
