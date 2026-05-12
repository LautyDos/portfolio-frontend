'use client'

import { deleteExperienceApi } from "@/features/delete-experience/api/deleteExperienceApi"
import { useState } from "react"

type DeleteExperienceButtonProps = {
    experienceId: string
    onDeleted: () => void
}

export function DeleteExperienceButton({experienceId, onDeleted}: DeleteExperienceButtonProps){
    const [confirming, setConfirming] = useState(false)
    const [loading, setLoading] = useState(false)

    if (confirming) {
        return (
            <span className="flex gap-2 items-center">
                <button 
                    onClick={async () => {
                        setLoading(true)
                        try{
                            await deleteExperienceApi(experienceId)
                            onDeleted()
                        } finally {
                            setLoading(false)
                            setConfirming(false)
                        }
                    }}
                    disabled={loading}
                    className="text-xs font-mono text-red-400 hover:text-red-300"
                >
                    {loading ? 'eliminando...' : 'confirmar'}
                </button>
                <button
                onClick={() => setConfirming(false)}
                className="text-xs font-mono text-muted-foreground hover:text-foreground"
                >
                    cancelar
                </button>
            </span>
        )
    }

    return (
        <button
            onClick={() => setConfirming(true)}
            className="text-xs font-mono text-muted-foreground hover:text-red-400"
        >
        eliminar
        </button>
    )
}