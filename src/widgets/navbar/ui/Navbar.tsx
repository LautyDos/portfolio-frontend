const NAV_LINKS = [                                                                                                                                         
    { label: 'Sobre mí', href: '#about' },                                                                                                                    
    { label: 'Experiencia', href: '#experience' },                                                                                                            
    { label: 'Proyectos', href: '#projects' },                                                                                                                
    { label: 'Tecnologías', href: '#technologies' },                                                                                                          
    { label: 'Contacto', href: '#contact' },                                                                                                                  
  ]
                                                                                                                                                              
  const SOCIAL_LINKS = [                                    
    { label: 'GitHub', href: '#' },                                                                                                                           
    { label: 'LinkedIn', href: '#' },                       
    { label: 'Twitter', href: '#' },                                                                                                                          
  ]

export function Navbar(){
    return(
        <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-sm">
            <nav className="max-w-4xl mx-auto px-8 flex items-center justify-center h-12 gap-6">
                {NAV_LINKS.map(link => (
                    <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors font-mono">
                        {link.label}
                    </a>
                ))}
            </nav>

            <nav className="border-t border-border/50 max-w-4xl mx-auto justify-center px-8 flex items-center h-8 gap-4">
                {SOCIAL_LINKS.map(link => (
                    <a
                    key={link.label}
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-accent transition-colors font-mono"
                    >
                        {link.label}
                    </a>
                ))}
            </nav>
        </header>
    )
}
