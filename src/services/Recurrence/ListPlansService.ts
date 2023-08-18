import prismaClient from '../../prisma'

interface PlanRequest {
    user_id: string;
}

class ListPlansService {
    async execute({ user_id }: PlanRequest) {

        const plans = await prismaClient.recurrencePlans.findMany({
            where: {
                user_id: user_id
            },
            orderBy: {
                create_at: "asc"
            }
        })

        return (plans)
    }
}

export { ListPlansService }