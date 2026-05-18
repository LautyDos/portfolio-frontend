import type { TechnologyDto } from "@/entities/technology/model/types";
import type { UserDto } from "@/entities/user/model/types";
import { TechnologiesPage } from "@/pages/technologies/ui/TechnologiesPage";
import { httpClient } from "@/shared/api/httpClient";
import { cookies } from "next/headers";

export default async function AdminTechnologiesPage(){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    const me = await httpClient<UserDto>('/auth/me', {token})
    const [userTechnologies, allTechnologies] = await Promise.all([
        httpClient<TechnologyDto[]>(`/users/${me.id}/technologies`),
        httpClient<TechnologyDto[]>('/technologies'),
    ])

    return (
        <TechnologiesPage userTechnologies={userTechnologies} allTechnologies={allTechnologies} />
    )
}