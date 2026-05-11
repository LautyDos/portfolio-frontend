import { cookies } from "next/headers"
import type { ProjectDto } from "@/entities/project/model/types"
import type { UserDto } from "@/entities/user/model/types"
import { ProjectsPage } from "@/pages/projects/ui/ProjectsPage"
import { httpClient } from "@/shared/api/httpClient"

export default async function AdminProjectsPage(){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    const me = await httpClient<UserDto>('/auth/me', { token })
    const projects = await httpClient<ProjectDto[]>(`/users/${me.id}/projects`, {token})

    return <ProjectsPage projects={projects} />
}
