import prismaClient from '../../prisma'

interface TableRequest {
    id: string;
}

class DeleteTableService {
    async execute({ id }: TableRequest) {

        const table = await prismaClient.table.delete({
            where: {
                id: id
            }
        })
        return (table)
    }
}

export { DeleteTableService }