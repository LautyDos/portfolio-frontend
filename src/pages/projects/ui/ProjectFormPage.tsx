import type { ProjectDto } from "../../../entities/project/model/types"
import { ProjectImagesManager } from "../../../features/manage-projects-images/ui/ProjectImagesManager"
import { ProjectForm } from "../../../features/project-form/ui/ProjectForm"

type ProjectFormPageProps = {
    project?: ProjectDto
}

export function ProjectFormPage({project}: ProjectFormPageProps){
    return (
        <div className="flex flex-col gap-12 max-w-2xl">
            <section className="flex flex-col gap-4">
                <h1 className="font-mono text-foreground text-sm">
                    {project ? `$ editar / ${project.title}`: '$ nuevo proyecto'}
                </h1>
                <ProjectForm project={project}></ProjectForm>
            </section>
            {project && (
                <section className="flex flex-col gap-4">
                    <h2 className="font-mono text-foreground text-sm">$ imágenes</h2>
                    <ProjectImagesManager projectId={project.id} initialImages={project.images}></ProjectImagesManager>
                </section>
            )}
        </div>
    )
}