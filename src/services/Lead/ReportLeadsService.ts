import prismaClient from '../../prisma'

interface LeadRequest {
    userId: string;
}

class ReportLeadsService {
    async execute({ userId }: LeadRequest) {

        const leads = await prismaClient.lead.findMany({
            where: {
                user_id: userId
            },
            orderBy: {
                create_at: "asc"
            }
        })

        return (leads)
    }
}

export { ReportLeadsService }