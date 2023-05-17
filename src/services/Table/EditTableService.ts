import prismaClient from '../../prisma'

interface TableRequest {
    name: string;
    order: string;
    id: string;
    view_conversion: boolean;
}

class EditTableService {
    async execute({ name, id, order, view_conversion }: TableRequest) {

        if (!name) {
            throw new Error("Nome é obrigatório")
        }

        const table = await prismaClient.table.update({
            where: {
                id: id
            },
            data: {
                name: name,
                view_conversion: view_conversion,
                order: order ? Number(order) : 0
            },
            include: {
                leads: {
                    orderBy: {
                        update_at: "asc"
                    }
                }
            }
        })

        return (table)
    }
}

export { EditTableService }