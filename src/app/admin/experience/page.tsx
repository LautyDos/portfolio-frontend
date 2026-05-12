import type { ExperienceDto } from "@/entities/experience/model/types";
import { ExperiencesPage } from "@/pages/experience/ui/ExperiencePage";
import { httpClient } from "@/shared/api/httpClient";
import { cookies } from "next/headers";


export default async function AdminExperiencePage(){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    const experiences = await httpClient<ExperienceDto[]>('/experiences', {token})

    return <ExperiencesPage experiences={experiences}></ExperiencesPage>
}