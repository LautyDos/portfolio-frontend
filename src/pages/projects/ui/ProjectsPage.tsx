'use client'

import Link from "next/link"
import { useState } from "react"
import type { ProjectDto } from "@/entities/project/model/types"
import { DeleteProjectButton } from "@/features/delete-project/ui/DeleteProjectButton"
import { ToggleFeaturedButton } from "@/features/toggle-featured/ui/ToggleFeaturedButton"

type ProjectPageProps = {
    projects: ProjectDto[]
}

export function ProjectsPage({projects: initialProjects}: ProjectPageProps){
    const [projects, setProjects] = useState(initialProjects)

    return(
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="font-mono text-foreground text-sm">$ proyectos</h1>
                <Link href="/admin/projects/new" className="text-xs font-mono text-accent hover:text-accent/80">
                    + nuevo proyecto
                </Link>
            </div>
            <div className="flex flex-col gap-2">
                {projects.map(project => (
                    <div key={project.id} className="flex items-center justify-between border border-border rounded px-4 py-3 bg-surface">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-mono text-foreground">{project.title}</span>
                            <span className="text-xs font-mono text-muted-foreground">{project.images.length} imagen(es)</span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <ToggleFeaturedButton projectId={project.id} initialFeatured={project.featured} />
                            <Link href={`/admin/projects/${project.id}/edit`} className="text-xs font-mono text-muted-foreground hover:text-foreground">
                                editar
                            </Link>
                            <DeleteProjectButton projectId={project.id} onDeleted={() => setProjects(prev => prev.filter(p => p.id !== project.id))} />
                        </div>
                    </div>
                ))}

                {projects.length === 0 && (
                    <p className="text-sm font-mono text-muted-foreground">sin proyectos todavía.</p>
                )}
            </div>
        </div>
    )
}
