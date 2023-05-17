import { format } from 'date-fns';
import prismaClient from '../../../prisma'

interface UserRequest {
    userId: string;
    page: string;
    search: string;
}

class ListUsersService {
    async execute({ userId, page, search }: UserRequest) {

        const listUsersTotal = await prismaClient.user.count({
            where:
                search ? {
                    OR: [
                        {
                            email: {
                                contains: search,
                            },
                        },
                        {
                            name: {
                                contains: search,
                            },
                        }
                    ]
                } : {},
        })

        const listUsers = await prismaClient.user.findMany({
            skip: parseInt(page) * 25,
            take: 25,
            where:
                search ? {
                    OR: [
                        {
                            email: {
                                contains: search,
                            },
                        },

                        {
                            name: {
                                contains: search,
                            },
                        }
                    ]
                } : {},
            orderBy: {
                update_at: "desc"
            },
            select: {
                update_at: true,
                name: true,
                email: true,
                id: true
            }
        })


        return ({
            users: listUsers,
            total: listUsersTotal
        })
    }
}

export { ListUsersService }