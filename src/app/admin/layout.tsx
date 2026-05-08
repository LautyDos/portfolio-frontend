import { AdminSidebar } from "../../widgets/admin-sidebar/ui/AdminSidebar";

export default function AdminLayout({children}: {children: React.ReactNode}){
    return (
        <div className="flex h-screen bg-background text-foreground">
            <AdminSidebar></AdminSidebar>
            <main className="flex-1 overflox-y-auto p-8">
                {children}
            </main>
        </div>
    )
}