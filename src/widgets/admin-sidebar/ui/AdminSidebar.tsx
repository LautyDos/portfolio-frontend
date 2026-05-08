'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
  { label: "Perfil",       href: "/admin/profile" },
  { label: "Proyectos",    href: "/admin/projects" },
  { label: "Experiencia",  href: "/admin/experience" },
  { label: "Tecnologías",  href: "/admin/technologies" },
  { label: "Links",        href: "/admin/links" },
]

export function AdminSidebar(){
    const pathname = usePathname()

    return(
        <aside className="w-56 border-r border-border flex flex-col gap-1 p-4 shrink-0">
            <p className="text-xs text-muted-foreground font-mono mb-4 px-2">
                ~/admin
            </p>
            {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href 
                return (
                    <Link key={item.href} href={item.href} className={`px-3 py-2 rounded text-sm font-mono transition-colors ${
                        isActive
                            ? "bg-accent-subtle text-accent"
                            : "text-muted-foreground hover:text-foreground hover:bg-surface-raised"
                    }`}>
                        {isActive ? `$ ${item.label}` : item.label}
                    </Link>
                )
            })}
        </aside>
    )
}

