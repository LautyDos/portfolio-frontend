
export async function updateImageOrderApi(imageId: string, order: number): Promise<void>{
    const res = await fetch(`/api/admin/projects/images/${imageId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({order})
    })

    if(!res.ok) throw new Error('Error al actualizar el orden')
}