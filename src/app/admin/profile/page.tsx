import { cookies } from "next/headers";
import type { UserDto } from "../../../entities/user/model/types";
import { ProfilePage } from "../../../pages/profile/ui/ProfilePage";
import { httpClient } from "../../../shared/api/httpClient";

export default async function AdminProfilePage(){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    const user = await httpClient<UserDto>('/auth/me', {token})

    return <ProfilePage user={user}/>
}