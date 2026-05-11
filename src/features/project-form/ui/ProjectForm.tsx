'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import type { ProjectDto } from "../../../entities/project/model/types"
import { SubmitButton } from "../../../shared/ui/submit-button/SubmitButton"
import { createProjectApi } from "../../create-project/api/createProjectApi"
import { editProjectApi } from "../../edit-project/api/editProjectApi"

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
            <Field label="título" value={title} onChange={setTitle} required></Field>
            <Field label="Descripción" value={description} onChange={setDescription} textarea></Field>
            <Field label="repo url" value={repoUrl} onChange={setRepoUrl} type="url"></Field>
            <Field label="live url" value={liveUrl} onChange={setLiveUrl} type="url"></Field>

            {error && <p className="text-sm font-mono text-red-400">{error}</p>}

            <SubmitButton loading={loading} label={isEditing ? 'guardar cambios' : 'crear proyecto'}></SubmitButton>
        </form>
    )
}

type FieldProps = {
    label: string
    value: string
    onChange: (v: string) => void
    type?: string
    textarea?: boolean
    required?: boolean
}

function Field({label, value, onChange, type = 'text', textarea = false, required}: FieldProps){
    const base = "bg-surface border border-border rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent w-full"
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground font-mono">{label}</label>
            {textarea 
            ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} required={required} className={`${base} resize-none`}></textarea>
            : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} className={base}></input>}
        </div>
    )
}