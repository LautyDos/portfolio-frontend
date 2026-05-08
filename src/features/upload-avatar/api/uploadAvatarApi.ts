

export async function uploadAvatarApi(file: File): Promise<void>{
    const formData = new FormData()
    formData.append('avatar', file)

    const res = await fetch('/api/admin/avatar', {
        method:'POST',
        body: formData,
    })

    if(!res.ok) throw new Error('Error al subir el avatar')
}