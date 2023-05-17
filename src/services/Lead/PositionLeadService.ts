import prismaClient from '../../prisma'

interface LeadRequest {
    id: string;
    table_id: string;
    label: string;
}

class PositionLeadService {
    async execute({ id, table_id, label }: LeadRequest) {

        if (!id || !table_id) {
            throw new Error("Id da nova tabela e do lead é obrigatório")
        }

        await prismaClient.historic.create({
            data: {
                lead_id: id,
                name: label
            }
        })

        const lead = await prismaClient.lead.update({
            where: {
                id: id,
            },
            data: {
                table_id: table_id,
                update_at: new Date()
            }
        })

        return (lead)
    }
}

export { PositionLeadService }