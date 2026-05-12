import type { ExperienceDto } from "@/entities/experience/model/types";
import type { CreateExperienceRequest } from "@/features/create-experience/model/types";
import { httpClient } from "@/shared/api/httpClient";
import { cookies } from "next/headers";

export async function POST(request: Request){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    if(!token) return Response.json({error: 'No autenticado'}, {status: 401})
    
    const body: CreateExperienceRequest = await request.json()

    try{
        const experience = await httpClient<ExperienceDto>('/experiences',{
            method: 'POST',
            body: JSON.stringify(body),
            token,
        })
        return Response.json(experience)
    } catch {
        return Response.json({error:'Error al crear la experiencia'}, {status: 500})
    }
}