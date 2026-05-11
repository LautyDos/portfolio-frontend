import type { UserDto } from "@/entities/user/model/types"
import { ChangePasswordForm } from "@/features/change-password/ui/ChangePasswordForm"
import { EditProfileForm } from "@/features/edit-profile/ui/EditProfileForm"
import { UploadAvatarForm } from "@/features/upload-avatar/ui/UploadAvatarForm"

type ProfilePageProps = {
    user: UserDto
}

export function ProfilePage({user}: ProfilePageProps){
    return (
        <div className="flex flex-col gap-12 max-w-2xl">
            <section className="flex flex-col gap-4">
                <h2 className="font-mono text-foreground text-sm">$ Avatar</h2>
                <UploadAvatarForm currentAvatarUrl={user.avatarUrl} />
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="font-mono text-foreground text-sm">$ datos personales</h2>
                <EditProfileForm user={user} />
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="font-mono text-foreground text-sm">$ contraseña</h2>
                <ChangePasswordForm />
            </section>
        </div>
    )
}
