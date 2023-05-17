import prismaClient from '../../prisma'

interface LeadRequest {
    userId: string;
}

class ListLeadsService {
    async execute({ userId }: LeadRequest) {

        const leads = await prismaClient.lead.findMany({
            where: {
                user_id: userId
            },
            include: {
                table: {
                    include: {
                        grid: true,
                    }
                }
            },
            orderBy: {
                create_at: "asc"
            }
        })

        return (leads)
    }
}

export { ListLeadsService }