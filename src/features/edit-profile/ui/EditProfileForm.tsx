'use client'

import { useState } from "react"
import type { UserDto } from "@/entities/user/model/types"
import { editProfileApi } from "../api/editProfileApi"
import { FormField } from "@/shared/ui/form-field/FormField"
import { SubmitButton } from "@/shared/ui/submit-button/SubmitButton"

type EditProfileFormProps = {
    user: UserDto
}

export function EditProfileForm({user}: EditProfileFormProps){
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [location, setLocation] = useState(user.location ?? '')
    const [bio, setBio] = useState(user.bio ?? '')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    return (
        <form onSubmit={async (e) => {
            e.preventDefault()
            setLoading(true)
            setSuccess(false)
            setError(null)
            try{
                await editProfileApi({name, email, location, bio})
                setSuccess(true)
            } catch(err){
                console.error('[EditProfileForm]', err)
                setError('No se pudo actualizar el perfil')
            } finally {
                setLoading(false)
            }
        }}
        className="flex flex-col gap-4 max-w-md"
        >
            <FormField label="nombre" value={name} onChange={setName} />
            <FormField label="email" value={email} onChange={setEmail} />
            <FormField label="ubicación" value={location} onChange={setLocation} />
            <FormField label="bio" value={bio} onChange={setBio} textarea />

            {error && <p className="text-sm font-mono text-red-400">{error}</p>}
            {success && <p className="text-sm font-mono text-accent">✓ Perfil actualizado</p>}

            <SubmitButton loading={loading} label="guardar" />
        </form>
    )
}

