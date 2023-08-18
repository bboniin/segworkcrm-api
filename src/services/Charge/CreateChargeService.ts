import prismaClient from '../../prisma'

interface ChargeRequest {
    name: string;
    value: number;
    user_id: string;
    lead_id: string;
    date_charge: Date;
}

class CreateChargeService {
    async execute({ name, value, user_id, date_charge, lead_id }: ChargeRequest) {

        if (!name || !date_charge || !value || !user_id || !lead_id) {
            throw new Error("Nome, periodo, valor, id do usuário e do lead é obrigatório")
        }

        const charge = await prismaClient.charge.create({
            data: {
                name: name,
                value: value,
                lead_id: lead_id,
                date_charge: date_charge,
                user_id: user_id,
                confirmed: false
            }
        })

        return (charge)
    }
}

export { CreateChargeService }