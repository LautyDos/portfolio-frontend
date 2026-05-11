import { cookies } from "next/headers"
import type { ProjectDto } from "@/entities/project/model/types"
import { ProjectFormPage } from "@/pages/projects/ui/ProjectFormPage"
import { httpClient } from "@/shared/api/httpClient"

export default async function EditProjectPage({params}: {params: Promise<{id: string}>}){
    const {id} = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    const project = await httpClient<ProjectDto>(`/projects/${id}`, {token})

    return <ProjectFormPage project={project} />
}
