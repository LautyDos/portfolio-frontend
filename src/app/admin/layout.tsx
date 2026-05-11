import { cookies } from "next/headers"
import { AdminSidebar } from "@/widgets/admin-sidebar/ui/AdminSidebar"

export default async function AdminLayout({children}: {children: React.ReactNode}){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) return <>{children}</>

    return (
        <div className="flex h-screen bg-background text-foreground">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    )
}
