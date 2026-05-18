import type { AddUserTechnologyRequest } from "@/features/add-user-technology/model/types";

export async function addUserTechnologyApi(data: AddUserTechnologyRequest): Promise<void>{
    const res = await fetch('/api/admin/technologies/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if(!res.ok) throw new Error('Error al asociar la tecnología')
}