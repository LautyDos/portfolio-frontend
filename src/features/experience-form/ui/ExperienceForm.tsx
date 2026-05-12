'use client'

import type { ExperienceDto } from "@/entities/experience/model/types"
import { createExperienceApi } from "@/features/create-experience/api/createExperienceApi"
import { editExperienceApi } from "@/features/edit-experience/api/editExperienceApi"
import { FormField } from "@/shared/ui/form-field/FormField"
import { SubmitButton } from "@/shared/ui/submit-button/SubmitButton"
import { useRouter } from "next/navigation"
import { useState } from "react"

type ExperienceFormProps = {
    experience?: ExperienceDto
}

export function ExperienceForm({experience}: ExperienceFormProps){
    const router = useRouter()
    const [organization, setOrganization] = useState(experience?.organization ?? '')
    const [role, setRole] = useState(experience?.role ?? '')
    const [description, setDescription] = useState(experience?.description ?? '')
    const [startDate, setStartDate] = useState(experience?.startDate?.slice(0, 10) ?? '')
    const [endDate, setEndDate] = useState(experience?.endDate?.slice(0, 10) ?? '')
    const [current, setCurrent] = useState(experience?.current ?? false)
    const [additionalInfo, setAdditionalInfo] = useState(experience?.additionalInfo ?? '')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const isEditing = !!experience

    const payload = {
        organization,
        role,
        description,
        startDate,
        endDate: current ? null : endDate || null,
        current,
        additionalInfo,
    }

    return (
        <form 
            onSubmit={async (e) => {
                e.preventDefault()
                setLoading(true)
                setError(null)
                try{
                    if (isEditing) {
                        await editExperienceApi(experience.id, payload)
                    } else{
                        await createExperienceApi(payload)
                        router.push('/admin/experience')
                    }
                } catch {
                    setError('No se pudo guardar la experiencia')
                } finally {
                    setLoading(false)
                }
            }}
            className="flex flex-col gap-4 max-w-md"
        >
            <FormField label="organización" value={organization} onChange={setOrganization} required />
            <FormField label="rol" value={role} onChange={setRole} required />
            <FormField label="descripción" value={description} onChange={setDescription} textarea />
            <FormField label="fecha de inicio" value={startDate} onChange={setStartDate} type="date" required />

            <div className="flex items-center gap-2">
                <input
                    id="current"
                    type="checkbox"
                    checked={current}
                    onChange={(e) => setCurrent(e.target.checked)}
                    className="accent-accent"
                />
                <label htmlFor="current" className="text-xs font-mono text-muted-foreground">trabajo actual</label>
            </div>

            {!current && (
                <FormField label="fecha de fin" value={endDate} onChange={setEndDate} type="date" />
            )}

            <FormField label="información adicional" value={additionalInfo} onChange={setAdditionalInfo} textarea />

            {error && <p className="text-sm font-mono text-red-400">{error}</p>}

            <SubmitButton loading={loading} label={isEditing ? 'guardar cambios' : 'crear experiencia'} />
        </form>
    )
}