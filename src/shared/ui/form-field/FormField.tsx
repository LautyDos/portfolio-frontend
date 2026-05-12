type FormFieldProps = {
    label: string
    value: string
    onChange: (v: string) => void
    type?: string
    textarea?: boolean
    required?: boolean
}

export function FormField({label, value, onChange, type = 'text', textarea = false, required}: FormFieldProps){
    const base = "bg-surface border border-border rounded px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent w-full"
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground font-mono">{label}</label>
            {textarea
                ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} required={required} className={`${base} resize-none`} />
                : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} className={base} />
            }
        </div>
    )
}
