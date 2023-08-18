import prismaClient from '../../prisma'

interface PlanRequest {
    user_id: string;
}

class ListChargesService {
    async execute({ user_id }: PlanRequest) {

        const charges = await prismaClient.charge.findMany({
            where: {
                user_id: user_id,
                confirmed: false
            },
            include: {
                lead: true
            },
            orderBy: {
                date_charge: "asc"
            }
        })

        return (charges)
    }
}

export { ListChargesService }