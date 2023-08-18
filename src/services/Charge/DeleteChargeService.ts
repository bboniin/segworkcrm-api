import prismaClient from '../../prisma'

interface ChargeRequest {
    id: string;
}

class DeleteChargeService {
    async execute({ id }: ChargeRequest) {

        const charge = await prismaClient.charge.delete({
            where: {
                id: id
            }
        })
        return (charge)
    }
}

export { DeleteChargeService }