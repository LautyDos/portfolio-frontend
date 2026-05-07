
type TerminalWindowProps = {
    title: string
    children: React.ReactNode
}

export function TerminalWindow({title, children}: TerminalWindowProps){
    return (
        <div className="rounded-lg border border-border bg-surface overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-surface-raised border-b border-border">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="ml-2 text-xs text-muted-foreground font-mono">{title}</span>
            </div>
            <div className="p-5 font-mono text-sm text-foreground">
                {children}
            </div>
        </div>
    )
}