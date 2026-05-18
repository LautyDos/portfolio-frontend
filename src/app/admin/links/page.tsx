import type { UserLinkDto } from "@/entities/user-link/model/types";
import type { UserDto } from "@/entities/user/model/types";
import { LinksPage } from "@/pages/links/ui/LinksPage";
import { httpClient } from "@/shared/api/httpClient";
import { cookies } from "next/headers";

export default async function AdminLinksPage(){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    const me = await httpClient<UserDto>('/auth/me', {token})
    const links = await httpClient<UserLinkDto[]>(`/users/${me.id}/links`)

    return <LinksPage links={links} />
}