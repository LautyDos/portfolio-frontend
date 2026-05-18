
export async function removeUserTechnologyApi(technologyId: string): Promise<void>{
    const res = await fetch(`/api/admin/technologies/user/${technologyId}`,{
        method: 'DELETE'
    })

    if (!res.ok) throw new Error('Error al desasociar la tecnología')
}