import type { ExperienceDto } from "@/entities/experience/model/types"
import { ExperienceFormPage } from "@/pages/experience/ui/ExperienceFormPage"
import { httpClient } from "@/shared/api/httpClient"
import { cookies } from "next/headers"

export default async function EditExperiencePage({params}: {params: Promise<{id: string}>}){
    const {id} = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    const experiences = await httpClient<ExperienceDto[]>('/experiences', {token})
    const experience = experiences.find(e => e.id === id)
    if (!experience) return <p className="text-sm font-mono text-red-400">Experiencia no encontrada.</p>

    return <ExperienceFormPage experience={experience}></ExperienceFormPage>
}