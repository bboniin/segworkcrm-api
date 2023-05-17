import prismaClient from '../../prisma'

interface TableRequest {
    grid_id: string;
}

class ListTablesService {
    async execute({ grid_id }: TableRequest) {

        const tables = await prismaClient.table.findMany({
            where: {
                grid_id: grid_id
            },
            orderBy: {
                order: "asc"
            }
        })

        return (tables)
    }
}

export { ListTablesService }