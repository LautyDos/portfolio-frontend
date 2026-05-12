'use client'

import type { ExperienceDto } from "@/entities/experience/model/types"
import { DeleteExperienceButton } from "@/features/delete-experience/ui/DeleteExperienceButton"
import Link from "next/link"

import { useState } from "react"

type ExperiencesPageProps = {
    experiences: ExperienceDto[]
}

export function ExperiencesPage({experiences: initialExperiences}: ExperiencesPageProps){
    const [experiences, setExperiences] = useState(initialExperiences)

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="font-mono text-foreground text-sm">
                    $ experiencia
                </h1>
            
                <Link href="/admin/experience/new" className="text-xs font-mono text-accent hover:text-accent/80"> 
                    + nueva experiencia
                </Link>
            </div>

            <div className="flex flex-col gap-2">
                {experiences.map(exp => (
                    <div 
                        key={exp.id}
                        className="flex items-center justify-between border border-border rounded px-4 py-3 bg-surface"
                    >
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-mono text-foreground">{exp.role}</span>
                            <span className="text-xs font-mono text-muted-foreground">
                                {exp.organization} · {exp.startDate.slice(0, 7)} — {exp.current ? 'presente' : exp.endDate?.slice(0, 7) ?? ''}
                            </span>
                        </div>
                        <div className="flex gap-4 items-center">
                            <Link
                            href={`/admin/experience/${exp.id}/edit`}
                            className="text-xs font-mono text-muted-foreground hover:text-foreground"
                            >
                                editar
                            </Link>
                            <DeleteExperienceButton
                                experienceId={exp.id}
                                onDeleted={() => setExperiences(prev => prev.filter(e => e.id !== exp.id))}
                            />
                        </div>
                    </div>
                ))}

                {experiences.length === 0 && (
                    <p className="text-sm font-mono text-muted-foreground">sin experiencias todavía.</p>
                )}
            </div>
        </div>
    )
}