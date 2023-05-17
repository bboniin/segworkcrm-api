import prismaClient from '../../prisma'

interface GridRequest {
    id: string;
}

class DeleteGridService {
    async execute({ id }: GridRequest) {

        const grid = await prismaClient.grid.delete({
            where: {
                id: id
            }
        })
        return (grid)
    }
}

export { DeleteGridService }