'use client'

import { useState } from "react"
import { SubmitButton } from "@/shared/ui/submit-button/SubmitButton"
import { changePasswordApi } from "../api/changePasswordApi"

export function ChangePasswordForm(){
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                setLoading(true)
                setSuccess(false)
                setError(null)
                try{
                    await changePasswordApi({currentPassword, newPassword})
                    setSuccess(true)
                    setCurrentPassword('')
                    setNewPassword('')
                }catch{
                    setError('Contraseña actual incorrecta')
                } finally{
                    setLoading(false)
                }
            }}
            className="flex flex-col gap-4 max-w-md"
        >
            <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground font-mono">contraseña actual</label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required
                className="bg-surface border border-border rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground font-mono">nueva contraseña</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required
                className="bg-surface border border-border rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent"
                />
            </div>

            {error && <p className="text-sm font-mono text-red-400">{error}</p>}
            {success && <p className="text-sm font-mono text-accent">✓ Contraseña actualizada</p>}

            <SubmitButton loading={loading} label="cambiar contraseña" />
        </form>
    )
}
