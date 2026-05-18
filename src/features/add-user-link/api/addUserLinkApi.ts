import type { UserLinkDto } from "@/entities/user-link/model/types";
import type { AddUserLinkRequest } from "@/features/add-user-link/model/types";

export async function addUserLinkApi(data: AddUserLinkRequest): Promise<UserLinkDto>{
    const res = await fetch('/api/admin/links', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })

    if(!res.ok) throw new Error('Error al agregar el link')

    return res.json()
}