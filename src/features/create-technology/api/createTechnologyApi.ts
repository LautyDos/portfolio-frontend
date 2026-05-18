import type { TechnologyDto } from "@/entities/technology/model/types";
import type { CreateTechnologyRequest } from "@/features/create-technology/model/types";

export async function createTechnologyApi(data: CreateTechnologyRequest): Promise<TechnologyDto>{
    const res = await fetch('/api/admin/technologies', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error('Error al crear la tecnología')

    return res.json()
}