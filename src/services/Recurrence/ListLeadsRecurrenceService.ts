import prismaClient from '../../prisma'

interface LeadRRecurrenceequest {
    user_id: string;
}

class ListLeadsRecurrenceService {
    async execute({ user_id }: LeadRRecurrenceequest) {

        const leads = await prismaClient.lead.findMany({
            where: {
                user_id: user_id,
                recurrence: true
            },
            orderBy: {
                date_recurrence: "asc"
            },
            include: {
                table: {
                    include: {
                        grid: true,
                    }
                }
            },
        })

        return (leads)
    }
}

export { ListLeadsRecurrenceService }