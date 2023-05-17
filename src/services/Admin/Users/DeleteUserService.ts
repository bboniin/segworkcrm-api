import prismaClient from '../../../prisma'

interface UserRequest {
    id: string;
}

class DeleteUserService {
    async execute({ id }: UserRequest) {

        const user = await prismaClient.user.delete({
            where: {
                id: id
            },
        })
        return (user)
    }
}

export { DeleteUserService }