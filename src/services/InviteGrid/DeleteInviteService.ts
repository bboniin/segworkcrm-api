import prismaClient from '../../prisma'

interface InviteRequest {
    id: string;
}

class DeleteInviteService {
    async execute({ id }: InviteRequest) {

        const gridInvitation = await prismaClient.gridInvitations.findUnique({
            where: {
                id: id
            }
        })

        await prismaClient.gridInvitations.delete({
            where: {
                id: id
            }
        })

        const grid = await prismaClient.grid.findUnique({
            where: {
                id: gridInvitation.grid_id
            }
        })

        if(gridInvitation.status == "ativo"){
            await prismaClient.grid.update({
                where: {
                    id: gridInvitation.grid_id
                },
                data: {
                    team: grid.team.replace(`${gridInvitation.user_id};`, "")
                }
            })
        }

        

        return (gridInvitation)
    }
}

export { DeleteInviteService }