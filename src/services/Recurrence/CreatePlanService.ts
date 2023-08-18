import prismaClient from '../../prisma'

interface PlanRequest {
    name: string;
    value: number;
    user_id: string
    period_in_days: number;
}

class CreatePlanService {
    async execute({ name, value, user_id, period_in_days }: PlanRequest) {

        if (!name || !period_in_days || !value || !user_id) {
            throw new Error("Nome, periodo, valor e id do usuário é obrigatório")
        }

        const plan = await prismaClient.recurrencePlans.create({
            data: {
                name: name,
                value: value,
                period_in_days: period_in_days,
                user_id: user_id
            }
        })

        return (plan)
    }
}

export { CreatePlanService }