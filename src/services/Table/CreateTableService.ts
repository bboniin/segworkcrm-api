import prismaClient from '../../prisma'

interface TableRequest {
    name: string;
    order: number;
    grid_id: string
    view_conversion: boolean;
}

class CreateTableService {
    async execute({ name, order, grid_id, view_conversion }: TableRequest) {

        if (!name || !grid_id) {
            throw new Error("Nome e id do quadro é obrigatório")
        }

        const table = await prismaClient.table.create({
            data: {
                name: name,
                view_conversion: view_conversion,
                order: order ? Number(order) : 0,
                grid_id: grid_id
            }
        })

        return (table)
    }
}

export { CreateTableService }