import type { EditProfileRequest } from "../model/types";

export async function editProfileApi(data: EditProfileRequest): Promise<void>{
    const res = await fetch('/api/admin/profile',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })

    if(!res.ok) throw new Error('Error al actualizar el perfil')
}