import { LoginForm } from "@/features/login/ui/LoginForm"
import { DesktopBackground } from "@/shared/ui/desktop-background/DesktopBackground"
import { TerminalWindow } from "@/shared/ui/terminal-window/TerminalWindow"

export default function LoginPage(){
    return(
        <DesktopBackground>
            <main className="min-h-screen flex items-center justify-center px-4">
                <TerminalWindow title="~/admin/login.sh">
                    <div className="flex flex-col gap-2 mb-6">
                        <p className="text-accent font-mono text-sm">$ sudo access --panel admin</p>
                        <p className="text-muted-foreground font-mono text-xs">Introduce tus credenciales para continuar</p>
                    </div>
                    <LoginForm />
                </TerminalWindow>
            </main>
        </DesktopBackground>
    )
}
