import type { EditExperienceRequest } from "@/features/edit-experience/model/types";


export async function editExperienceApi(id: string, data: EditExperienceRequest): Promise<void>{
    const res = await fetch(`/api/admin/experiences/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })

    if(!res.ok) throw new Error('Error al actualizar la experiencia')
}