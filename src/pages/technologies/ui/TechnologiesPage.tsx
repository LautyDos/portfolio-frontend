'use client'

import type { TechnologyDto } from "@/entities/technology/model/types"
import { addUserTechnologyApi } from "@/features/add-user-technology/api/addUserTechnologyApi"
import { createTechnologyApi } from "@/features/create-technology/api/createTechnologyApi"
import { removeUserTechnologyApi } from "@/features/remove-user-technology/api/removeUserTechnologyApi"
import { FormField } from "@/shared/ui/form-field/FormField"
import { SubmitButton } from "@/shared/ui/submit-button/SubmitButton"
import { useState } from "react"

type TechnologiesPageProps = {
  userTechnologies: TechnologyDto[]
  allTechnologies: TechnologyDto[]
}

const CATEGORIES = ['frontend', 'backend', 'database', 'devops', 'mobile', 'tools']

export function TechnologiesPage({
  userTechnologies: initialUserTechnologies,
  allTechnologies,
}: TechnologiesPageProps) {
  const [userTechs, setUserTechs] = useState(initialUserTechnologies)
  const [selectedId, setSelectedId] = useState('')
  const [addError, setAddError] = useState<string | null>(null)
  const [addLoading, setAddLoading] = useState(false)

  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newIconUrl, setNewIconUrl] = useState('')
  const [createError, setCreateError] = useState<string | null>(null)
  const [createLoading, setCreateLoading] = useState(false)

  const availableTechs = allTechnologies.filter(t => !userTechs.some(u => u.id === t.id))

  const techsByCategory = CATEGORIES.reduce<Record<string, TechnologyDto[]>>((acc, cat) => {
    const techs = userTechs.filter(t => t.category === cat)
    if (techs.length > 0) acc[cat] = techs
    return acc
  }, {})

  async function handleAdd() {
    if (!selectedId) return
    setAddLoading(true)
    setAddError(null)
    try {
      await addUserTechnologyApi({ technologyId: selectedId })
      const added = allTechnologies.find(t => t.id === selectedId)!
      setUserTechs(prev => [...prev, added])
      setSelectedId('')
    } catch {
      setAddError('No se pudo asociar la tecnología')
    } finally {
      setAddLoading(false)
    }
  }

  async function handleRemove(technologyId: string) {
    try {
      await removeUserTechnologyApi(technologyId)
      setUserTechs(prev => prev.filter(t => t.id !== technologyId))
    } catch {
      // silencioso — la UI no cambia si falla
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setCreateLoading(true)
    setCreateError(null)
    try {
      const created = await createTechnologyApi({ name: newName, category: newCategory, iconUrl: newIconUrl })
      setUserTechs(prev => [...prev, created])
      setNewName('')
      setNewCategory('')
      setNewIconUrl('')
    } catch {
      setCreateError('No se pudo crear la tecnología')
    } finally {
      setCreateLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-mono text-foreground text-sm">$ tecnologías</h1>

      {/* Lista de tecnologías del usuario */}
      <div className="flex flex-col gap-4">
        {Object.entries(techsByCategory).map(([category, techs]) => (
          <div key={category} className="flex flex-col gap-2">
            <span className="text-xs font-mono text-muted-foreground">{category}</span>
            <div className="flex flex-col gap-1">
              {techs.map(tech => (
                <div
                  key={tech.id}
                  className="flex items-center justify-between border border-border rounded px-4 py-2 bg-surface"
                >
                  <div className="flex items-center gap-3">
                    <img src={tech.iconUrl} alt={tech.name} className="w-4 h-4 object-contain" />
                    <span className="text-sm font-mono text-foreground">{tech.name}</span>
                  </div>
                  <button
                    onClick={() => handleRemove(tech.id)}
                    className="text-xs font-mono text-muted-foreground hover:text-red-400"
                  >
                    eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {userTechs.length === 0 && (
          <p className="text-sm font-mono text-muted-foreground">sin tecnologías todavía.</p>
        )}
      </div>

      {/* Agregar tecnología existente */}
      <div className="flex flex-col gap-3 max-w-md">
        <span className="text-xs font-mono text-muted-foreground">agregar del catálogo</span>
        <div className="flex gap-2">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="flex-1 bg-surface border border-border rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent"
          >
            <option value="">seleccionar tecnología...</option>
            {CATEGORIES.map(cat => {
              const options = availableTechs.filter(t => t.category === cat)
              if (!options.length) return null
              return (
                <optgroup key={cat} label={cat}>
                  {options.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </optgroup>
              )
            })}
          </select>
          <button
            onClick={handleAdd}
            disabled={!selectedId || addLoading}
            className="px-4 py-2 text-xs font-mono text-accent border border-accent rounded hover:bg-accent/10 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {addLoading ? 'agregando...' : 'agregar'}
          </button>
        </div>
        {addError && <p className="text-xs font-mono text-red-400">{addError}</p>}
      </div>

      {/* Crear tecnología nueva */}
      <form onSubmit={handleCreate} className="flex flex-col gap-3 max-w-md">
        <span className="text-xs font-mono text-muted-foreground">crear nueva tecnología</span>
        <FormField label="nombre" value={newName} onChange={setNewName} required />
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground font-mono">categoría</label>
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
            className="bg-surface border border-border rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent"
          >
            <option value="">seleccionar categoría...</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <FormField label="icon url" value={newIconUrl} onChange={setNewIconUrl} required />
        {createError && <p className="text-xs font-mono text-red-400">{createError}</p>}
        <SubmitButton loading={createLoading} label="crear tecnología" />
      </form>
    </div>
  )
}