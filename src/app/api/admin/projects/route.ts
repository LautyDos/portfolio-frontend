import { cookies } from "next/headers";
import { ProjectDto } from "../../../../entities/project/model/types";
import type { CreateProjectRequest } from "../../../../features/create-project/model/types";
import { httpClient } from "../../../../shared/api/httpClient";


export async function POST(request: Request){
    const cookieStorie = await cookies()
    const token = cookieStorie.get('auth_token')?.value
    if (!token) return Response.json({error: 'No autenticado'}, {status: 401})

        const body: CreateProjectRequest = await request.json()

        try {
            const project = await httpClient<ProjectDto>('/projects', {
                method: 'POST',
                body: JSON.stringify(body),
                token,
            })
            return Response.json(project)
        } catch {
            return Response.json({error: 'Error al crear el proyecto'}, {status: 500})
        }
}