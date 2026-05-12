import type { ExperienceDto } from "@/entities/experience/model/types";
import type { CreateExperienceRequest } from "@/features/create-experience/model/types";


export async function createExperienceApi(data: CreateExperienceRequest): Promise<ExperienceDto>{
    const res = await fetch('/api/admin/experiences', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error('Error al crear la experiencia')

    return res.json()
}