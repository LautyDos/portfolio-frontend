import type { ExperienceDto } from "@/entities/experience/model/types"
import { ExperienceForm } from "@/features/experience-form/ui/ExperienceForm"

type ExperienceFormPageProps = {
    experience?: ExperienceDto
}

export function ExperienceFormPage({experience}: ExperienceFormPageProps){
    return (
        <div className="flex flex-col gap-6 max-w-md">
            <h1 className="font-mono text-foreground text-sm">
                {experience ? `$ editar / ${experience.role}`: '$ nueva experiencia'}
            </h1>
            <ExperienceForm experience={experience}></ExperienceForm>
        </div>
    )
}