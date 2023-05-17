import prismaClient from '../../prisma'

interface GridRequest {
    id: string;
    userId: string;
}

class GetGridService {
    async execute({ id, userId }: GridRequest) {

        const grid = await prismaClient.grid.findUnique({
            where: {
                id: id
            },
            include: {
                grid_invitations: {
                    orderBy: {
                        create_at: "asc"
                    },
                },
                tables: {
                    orderBy: {
                        order: "asc"
                    },
                    include: {
                        leads: {
                            include: {
                                historical: true
                            },
                            orderBy: {
                                update_at: "asc"
                            }
                        }
                    }
                }
            }
        })

        if(grid.user_id != userId ){
            if(grid.team.indexOf(userId) == -1){
                throw new Error("Você não faz parte desse quadro")
            }
        }

        return (grid)
    }
}

export { GetGridService }