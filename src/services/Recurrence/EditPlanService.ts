import prismaClient from '../../prisma'

interface PlanRequest {
    id: string;
    name: string;
    value: number;
    user_id: string;
    period_in_days: number;
}


class EditPlanService {
    async execute({ name, id, user_id, value, period_in_days }: PlanRequest) {

        if (!name || !period_in_days || !value || !user_id) {
            throw new Error("Nome, periodo, valor e id do usuário é obrigatório")
        }

        const getPlan = await prismaClient.recurrencePlans.findFirst({
            where: {
                id: id,
                user_id: user_id,
            }
        })
        
        if (!getPlan) {
            throw new Error("Esse plano não pertence ao seu usuário")
        }

        const plan = await prismaClient.recurrencePlans.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                value: value,
                period_in_days: period_in_days 
            },
        })

        return (plan)
    }
}

export { EditPlanService }