

export async function uploadProjectImageApi(projectId: string, file: File, order: number): Promise<void>{
    const formData = new FormData()
    formData.append('file', file)
    formData.append('order', String(order))

    const res = await fetch(`/api/admin/projects/${projectId}/images`, {
        method: 'POST',
        body: formData,
    })

    if(!res.ok) throw new Error('Error al subir la imagen')
}