
export type ProjectImageDto = {
    id: string
    projectId: string
    url: string
    order: number
    createdAt: string
}

export type ProjectDto = {
    id: string
    userId: string
    title: string
    description: string | null
    repoUrl: string | null
    liveUrl: string | null
    featured: boolean
    createdAt: string
    updatedAt: string
    images: ProjectImageDto[]
}