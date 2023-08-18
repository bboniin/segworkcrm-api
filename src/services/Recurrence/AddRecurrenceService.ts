import { addDays, differenceInDays } from 'date-fns';
import prismaClient from '../../prisma'

interface RecurrenceRequest {
    plan_id: string;
    user_id: string;
    lead_id: string;
}

class AddRecurrenceService {
    async execute({ plan_id, user_id, lead_id }: RecurrenceRequest) {

        const plan = await prismaClient.recurrencePlans.findUnique({
            where: {
                id: plan_id
            }
        })

        if (!plan) {
            throw new Error("Plano não foi encontrado")
        }

        const getLead = await prismaClient.lead.findUnique({
            where: {
                id: lead_id
            }
        })

        if (!getLead) {
            throw new Error("Lead não foi encontrado")
        }

        let date_recurrence = addDays(new Date(), plan.period_in_days)

        if (differenceInDays(new Date(), getLead.date_recurrence) <= 0) {
            date_recurrence = addDays(getLead.date_recurrence, plan.period_in_days)
        }

        await prismaClient.recurrence.create({
            data: {
                lead_id,
                user_id,
                value: plan.value,
                name: plan.name,
                period_in_days: plan.period_in_days,
            }
        })

        const lead = await prismaClient.lead.update({
            where: {
                id: lead_id
            },
            data: {
                recurrence: true,
                date_recurrence: date_recurrence,
                value_recurrence: plan.value,
                name_recurrence: plan.name,
            }
        })
        return (lead)
    }
}

export { AddRecurrenceService }