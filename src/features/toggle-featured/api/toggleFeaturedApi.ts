
export async function toggleFeaturedApi(id: string, featured: boolean){
    const res = await fetch(`/api/admin/projects/${id}/featured`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({featured})
    })

    if(!res.ok) throw new Error('Error al actualizar featured')
}