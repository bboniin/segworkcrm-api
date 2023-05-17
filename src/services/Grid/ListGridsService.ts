import prismaClient from '../../prisma'

interface GridRequest {
    userId: string;
}

class ListGridsService {
    async execute({ userId }: GridRequest) {

        const grids = await prismaClient.grid.findMany({
            where: {
                user_id: userId
            },
            orderBy: {
                create_at: "asc"
            },
            include: {
                tables: {
                    orderBy: {
                        order: "asc"
                    }
                }
            }
        })

        const gridsTeam = await prismaClient.grid.findMany({
            where: {
                team: {
                    contains: userId
                }
            },
            orderBy: {
                create_at: "asc"
            },
            include: {
                tables: {
                    orderBy: {
                        order: "asc"
                    }
                }
            }
        })

        return ([...grids, ...gridsTeam])
    }
}

export { ListGridsService }