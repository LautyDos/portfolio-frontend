import type { ChangePasswordRequest } from "../model/types";

export async function changePasswordApi(data: ChangePasswordRequest): Promise<void>{
    const res = await fetch('/api/admin/password',{
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    })

    if(!res.ok) throw new Error('Error al cambiar la contraseña')
}