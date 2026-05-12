'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import type { ProjectDto } from "@/entities/project/model/types"
import { FormField } from "@/shared/ui/form-field/FormField"
import { SubmitButton } from "@/shared/ui/submit-button/SubmitButton"
import { createProjectApi } from "@/features/create-project/api/createProjectApi"
import { editProjectApi } from "@/features/edit-project/api/editProjectApi"

type ProjectFormProps = {
    project?: ProjectDto
}

export function ProjectForm({project}: ProjectFormProps){
    const router = useRouter()
    const [title, setTitle] = useState(project?.title ?? '')
    const [description, setDescription] = useState(project?.description ?? '')
    const [repoUrl, setRepoUrl] = useState(project?.repoUrl ?? '')
    const [liveUrl, setLiveUrl] = useState(project?.liveUrl ?? '')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const isEditing = !!project

    return (
        <form
        onSubmit={async (e) => {
            e.preventDefault()
            setLoading(true)
            setError(null)
            try {
                if (isEditing){
                    await editProjectApi(project.id, {title, description, repoUrl, liveUrl})
                } else {
                    const created = await createProjectApi({title, description, repoUrl, liveUrl})
                    router.push(`/admin/projects/${created.id}/edit`)
                    return
                }
            } catch {
                setError('No se pudo guardar el proyecto')
            } finally {
                setLoading(false)
            }
        }}
        className="flex flex-col gap-4 max-w-md"
        >
            <FormField label="título" value={title} onChange={setTitle} required />
            <FormField label="descripción" value={description} onChange={setDescription} textarea />
            <FormField label="repo url" value={repoUrl} onChange={setRepoUrl} type="url" />
            <FormField label="live url" value={liveUrl} onChange={setLiveUrl} type="url" />

            {error && <p className="text-sm font-mono text-red-400">{error}</p>}

            <SubmitButton loading={loading} label={isEditing ? 'guardar cambios' : 'crear proyecto'} />
        </form>
    )
}

