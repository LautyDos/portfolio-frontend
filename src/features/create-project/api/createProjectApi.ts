import type { ProjectDto } from "@/entities/project/model/types"
import type { CreateProjectRequest } from "../model/types"

export async function createProjectApi(data: CreateProjectRequest): Promise<ProjectDto>{
    const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error('Error al crear el proyecto')

    return res.json()
}
