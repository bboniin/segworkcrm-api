import prismaClient from '../../prisma'

interface ChargeRequest {
    id: string;
    user_id: string;
}

class ConfirmedChargeService {
    async execute({ id,  user_id, }: ChargeRequest) {

        if (!user_id || !id) {
            throw new Error("id da cobrança e do usuário é obrigatório")
        }

        const getPlan = await prismaClient.charge.findFirst({
            where: {
                id: id,
                user_id: user_id,
            }
        })
        
        if (!getPlan) {
            throw new Error("Esse plano não pertence ao seu usuário")
        }
    
        const charge = await prismaClient.charge.update({
            where: {
                id: id  
            },
            data: {
                confirmed: true,
            }
        })
    
        return (charge)
     }
}

export { ConfirmedChargeService }