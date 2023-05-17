import prismaClient from '../../prisma'

interface GridRequest {
    name: string;
    userId: string
}

class CreateGridService {
    async execute({ name, userId }: GridRequest) {

        if (!name || !userId) {
            throw new Error("Nome é obrigatório")
        }

        const grid = await prismaClient.grid.create({
            data: {
                name: name,
                user_id: userId
            }
        })

        return (grid)
    }
}

export { CreateGridService }