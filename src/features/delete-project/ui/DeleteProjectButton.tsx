'use client'

import { useState } from "react"
import { deleteProjectApi } from "../api/deleteProjectApi"

type DeleteProjectButtonProps ={
    projectId: string
    onDeleted: () => void
}

export function DeleteProjectButton({projectId, onDeleted}: DeleteProjectButtonProps){
    const [confirming, setConfirming] = useState(false)
    const [loading, setLoading] = useState(false)

    if (confirming){
        return (
            <span className="flex gap-2 items-center">
                <button onClick={async () => {
                    setLoading(true)
                    try {
                        await deleteProjectApi(projectId)
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
                <button onClick={() => setConfirming(false)} className="text-xs font-mono text-red-400 hover:text-red-300">
                    canclear
                </button>
            </span>
        )
    }

    return (
        <button onClick={() => setConfirming(true)} className="text-xs font-mono text-muted-foreground hover:text-red-400">
            eliminar
        </button>
    )
}