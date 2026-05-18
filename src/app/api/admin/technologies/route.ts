import type { TechnologyDto } from "@/entities/technology/model/types";
import type { CreateTechnologyRequest } from "@/features/create-technology/model/types";
import { httpClient } from "@/shared/api/httpClient";
import { cookies } from "next/headers";


export async function POST(request: Request){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if (!token) return Response.json({error: 'No autenticado'}, {status: 401})

    const body: CreateTechnologyRequest = await request.json()

    try {
        const technology = await httpClient<TechnologyDto>('/technologies', {
            method: 'POST',
            body: JSON.stringify(body),
            token,
        })
        return Response.json(technology)
    } catch {
        return Response.json({error: 'Error al cargar la tecnología'}, {status: 500})
    }
}