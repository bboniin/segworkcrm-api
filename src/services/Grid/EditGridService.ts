import prismaClient from '../../prisma'

interface GridRequest {
    name: string;
    userId: string;
    id: string;
    tables: Array<{ id: string }>;
}

class EditGridService {
    async execute({ name, id, userId, tables }: GridRequest) {

        if (!name) {
            throw new Error("Nome é obrigatório")
        }

        if (tables) {
            tables.map(async (item, index) => {
                await prismaClient.table.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        order: index,
                    }
                })
            })
        }

        const grid = await prismaClient.grid.update({
            where: {
                id: id
            },
            data: {
                name: name,
            },
            include: {
                tables: {
                    orderBy: {
                        order: "asc"
                    }
                }
            }
        })

        return (grid)
    }
}

export { EditGridService }