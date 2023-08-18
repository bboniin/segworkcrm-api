import prismaClient from '../../prisma'

interface ChargeRequest {
    id: string;
    name: string;
    value: number;
    user_id: string;
    date_charge: Date;
}

class EditChargeService {
    async execute({ id, name, value, user_id, date_charge }: ChargeRequest) {

        if (!name || !date_charge || !value || !user_id || !id) {
            throw new Error("Nome, data de cobrança, valor, id da cobrança e id do usuário é obrigatório")
        }

        const getCharge = await prismaClient.charge.findFirst({
            where: {
                id: id,
                user_id: user_id,
            }
        })
        
        if (!getCharge) {
            throw new Error("Essa cobrança não pertence ao seu usuário")
        }
    
        const charge = await prismaClient.charge.update({
            where: {
              id: id  
            },
            data: {
                name: name,
                value: value,
                date_charge: date_charge,
            }
        })

        return (charge)
     }
}

export { EditChargeService }