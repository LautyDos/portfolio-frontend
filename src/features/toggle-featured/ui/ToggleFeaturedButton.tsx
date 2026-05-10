'use client'

import { useState } from "react"
import { toggleFeaturedApi } from "../api/toggleFeaturedApi"

type ToggleFeaturedButtonProps = {
    projectId: string
    initialFeatured: boolean
}

export function ToggleFeaturedButton({projectId, initialFeatured}: ToggleFeaturedButtonProps){
    const [featured, setFeatured] = useState(initialFeatured)
    const [loading, setLoading] = useState(false)

    return(
        <button onClick={async () => {
            const next = !featured
            setLoading(true)
            try{
                await toggleFeaturedApi(projectId, next)
                setFeatured(next)
            } finally{
                setLoading(false)
            }
        }}
        disabled={loading}
        className={`text-xs font-mono transition-colors ${featured ? 'text-accent': 'text-muted-foreground hover:text-accent'}`}
        >
        {featured ? '* destacado': '☆ destacar'}
        </button>
    )
}