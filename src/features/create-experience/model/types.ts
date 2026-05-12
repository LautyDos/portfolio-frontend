
export type CreateExperienceRequest = {
    organization: string
    role: string
    description: string 
    startDate: string
    endDate: string | null
    current: boolean
    additionalInfo: string
}