
export async function deleteProjectApi(id: string): Promise<void>{
    const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
    })

    if(!res.ok) throw new Error('Error al eliminar el proyecto');
}