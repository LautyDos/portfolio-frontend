
type DesktopBackgroundProps = {
    children: React.ReactNode
}

export function DesktopBackground({ children }: DesktopBackgroundProps){
    return(
        <div className="desktop-bg min-h-screen">
            {children}
        </div>
    )
}