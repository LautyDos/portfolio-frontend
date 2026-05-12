
export async function deleteExperienceApi(id: string): Promise<void>{
    const res = await fetch(`/api/admin/experiences/${id}`, {
        method: 'DELETE',
    })

    if(!res.ok) throw new Error('Error al eliminar la experiencia')
}