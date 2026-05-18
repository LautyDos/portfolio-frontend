export async function deleteUserLinkApi(linkId: string): Promise<void>{
    const res = await fetch(`/api/admin/links/${linkId}`, {
        method: 'DELETE',
    })

    if(!res.ok) throw new Error('Error al eliminar el link')
}