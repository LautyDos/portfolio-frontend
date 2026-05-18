'use client'

import type { UserLinkDto } from "@/entities/user-link/model/types"
import { addUserLinkApi } from "@/features/add-user-link/api/addUserLinkApi"
import { deleteUserLinkApi } from "@/features/delete-user-link/api/deleteUserLinkApi"
import { FormField } from "@/shared/ui/form-field/FormField"
import { SubmitButton } from "@/shared/ui/submit-button/SubmitButton"
import { useState } from "react"

type LinksPageProps = {
  links: UserLinkDto[]
}

export function LinksPage({ links: initialLinks }: LinksPageProps) {
  const [links, setLinks] = useState(initialLinks)
  const [platform, setPlatform] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const created = await addUserLinkApi({ platform, url })
      setLinks(prev => [...prev, created])
      setPlatform('')
      setUrl('')
    } catch {
      setError('No se pudo agregar el link')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(linkId: string) {
    try {
      await deleteUserLinkApi(linkId)
      setLinks(prev => prev.filter(l => l.id !== linkId))
    } catch {
      // silencioso
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-mono text-foreground text-sm">$ links</h1>

      {/* Lista de links */}
      <div className="flex flex-col gap-2">
        {links.map(link => (
          <div
            key={link.id}
            className="flex items-center justify-between border border-border rounded px-4 py-3 bg-surface"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-mono text-foreground">{link.platform}</span>
              <span className="text-xs font-mono text-muted-foreground">{link.url}</span>
            </div>
            <button
              onClick={() => handleDelete(link.id)}
              className="text-xs font-mono text-muted-foreground hover:text-red-400"
            >
              eliminar
            </button>
          </div>
        ))}

        {links.length === 0 && (
          <p className="text-sm font-mono text-muted-foreground">sin links todavía.</p>
        )}
      </div>

      {/* Formulario de nuevo link */}
      <form onSubmit={handleAdd} className="flex flex-col gap-3 max-w-md">
        <span className="text-xs font-mono text-muted-foreground">agregar link</span>
        <FormField label="plataforma" value={platform} onChange={setPlatform} required />
        <FormField label="url" value={url} onChange={setUrl} required />
        {error && <p className="text-xs font-mono text-red-400">{error}</p>}
        <SubmitButton loading={loading} label="agregar" />
      </form>
    </div>
  )
}