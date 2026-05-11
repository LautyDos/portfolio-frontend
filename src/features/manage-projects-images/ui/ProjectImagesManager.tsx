'use client'

import Image from "next/image"
import { useState } from "react"
import type { ProjectImageDto } from "../../../entities/project/model/types"
import { deleteProjectImageApi } from "../api/deleteProjectImageApi"
import { updateImageOrderApi } from "../api/updateImageOrderApi"
import { uploadProjectImageApi } from "../api/uploadProjectImageApi"

type ProjectImagesManagerProps = {
    projectId: string
    initialImages: ProjectImageDto[]
}

export function ProjectImagesManager({projectId, initialImages}: ProjectImagesManagerProps){
    const [images, setImages] = useState(initialImages)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0]
        if (!file) return
        const order = images.length + 1
        setUploading(true)
        setError(null)
        try {
            await uploadProjectImageApi(projectId, file, order)
            window.location.reload()
        } catch {
            setError('No se pudo subir la imagen')
        } finally{
            setUploading(false)
        }
    }

    async function handleDelete(imageId: string){
        try{
            await deleteProjectImageApi(imageId)
            setImages(prev => prev.filter(img => img.id !== imageId))
        } catch{
            setError('No se pudo eliminar la imagen')
        }
    }

    async function handleOrderChange(imageId: string, newOrder: number){
        try {
            await updateImageOrderApi(imageId, newOrder)
            setImages(prev =>
                prev
                .map(img => img.id === imageId ? {...img, order: newOrder} : img)
                .sort((a,b) => a.order - b.order)
            ) 
        } catch{
            setError('No se pudo actualizar el orden')
        }
    }

    const sorted = [...images].sort((a,b) => a.order - b.order)

    return (
        <div className="flex flex-col gap-4">  
            <div className="flex flex-wrap gap-4">
                {sorted.map(img => (
                    <div key={img.id} className="flex flex-col gap-2 items-center">
                        <Image src={img.url} alt="" width={120} height={80} className="object-cover rounded border border-border"/>
                        <div className="flex gap-2 items-center">
                            <input
                            type="number"
                            value={img.order}
                            min={1}
                            onChange={e => handleOrderChange(img.id, Number(e.target.value))}
                            className="w-12 text-xs font-mono text-center bg-surface border border-border rounded px-1 py-0.5"
                            >
                            </input>
                            <button onClick={() => handleDelete(img.id)} className="text-xs font-mono text-muted-foreground hover:text-red-400">
                                x
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <label className="flex flex-col gap-1 cursor-pointer">
                <span className="text-xs text-muted-foreground font-mono">agregar imagen</span>
                <input 
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="text-sm font-mono text-muted-foreground"
                ></input>
            </label>

            {uploading && <p className="text-sm font-mono text-muted-foreground">subiendo...</p>}
            {error && <p className="text-sm font-mono text-red-400">{error}</p>}
        </div>
    )
}