import prismaClient from '../../prisma'

interface RecurrenceRequest {
    lead_id: string;
    user_id: string;
}

class ListRecurrencesService {
    async execute({ lead_id, user_id }: RecurrenceRequest) {

        const recurrences = await prismaClient.recurrence.findMany({
            where: {
                lead_id: lead_id,
                user_id: user_id
            },
            orderBy: {
                create_at: "asc"
            },
        })

        return (recurrences)
    }
}

export { ListRecurrencesService }