import type { EditProjectRequest } from "../model/types";

export async function editProjectApi(id: string, data: EditProjectRequest): Promise<void>{
    const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error('Error al actualizar el proyecto')
}
