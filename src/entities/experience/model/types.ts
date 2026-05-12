export type ExperienceDto = {
    id: string
    userId: string
    organization: string
    role: string
    description: string | null
    startDate: string
    endDate: string | null
    current: boolean
    additionalInfo: string | null
    createdAt: string
    updatedAt: string
}