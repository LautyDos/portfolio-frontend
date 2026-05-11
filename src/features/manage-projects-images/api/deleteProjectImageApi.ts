
export async function deleteProjectImageApi(imageId: string): Promise<void>{
    const res = await fetch(`/api/admin/projects/images/${imageId}`, {
        method: 'DELETE',
    })

    if(!res.ok) throw new Error('Error al eliminar la imagen')
}