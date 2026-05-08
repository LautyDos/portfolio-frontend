'use client'

import Image from "next/image"
import { useState } from "react"
import { uploadAvatarApi } from "../api/uploadAvatarApi"
import { SubmitButton } from "@/shared/ui/submit-button/SubmitButton"

type UploadAvatarFormProps = {
    currentAvatarUrl: string | null 
}

export function UploadAvatarForm({currentAvatarUrl}: UploadAvatarFormProps){
    const [preview, setPreview] = useState<string | null>(currentAvatarUrl)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0]
        if (!file) return
        setPreview(URL.createObjectURL(file))
    }

    return (
        <form 
            onSubmit={async (e) => {
                e.preventDefault()
                const input = (e.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>('input[type="file"]')
                const file = input?.files?.[0]
                if (!file) return
                setLoading(true)
                setError(null)
                try {
                    await uploadAvatarApi(file)
                } catch{
                    setError('No se pudo subir el avatar')
                } finally{
                    setLoading(false)
                }
            }}
            className="flex flex-col gap-4"
        >
            {preview && (
                <Image src={preview} alt="avatar" width={80} height={80} className="rounded-full object-cover"></Image>
            )}

            <input 
                type="file"
                accept= "image/*"
                onChange={handleFileChange}
                className="text-sm font-mono text-muted-foreground"
            >
            </input>

            {error && <p className="text-sm font-mono text-red-400">{error}</p>}

            <SubmitButton loading={loading} label="subir avatar" loadingLabel="subiendo..." />
        </form>
    )

}