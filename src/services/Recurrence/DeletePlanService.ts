import prismaClient from '../../prisma'

interface PlanRequest {
    id: string;
}

class DeletePlanService {
    async execute({ id }: PlanRequest) {

        const plan = await prismaClient.recurrencePlans.delete({
            where: {
                id: id
            }
        })
        return (plan)
    }
}

export { DeletePlanService }