import prismaClient from '../../prisma'

interface InviteRequest {
    id: string;
    accept: boolean;
    userId: string;
}

class AcceptInviteService {
    async execute({ id, userId, accept }: InviteRequest) {

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })

        const gridInvitation = await prismaClient.gridInvitations.findUnique({
            where: {
                id: id
            }
        })

        if(!gridInvitation){
            throw new Error("Convite não existe mais")
        }

        const grid = await prismaClient.grid.findUnique({
            where: {
                id: gridInvitation.grid_id
            }
        })

        if(!grid){
            throw new Error("Quadro não existe mais")
        }

        if(user.email != gridInvitation.email){
            throw new Error("Email do convite não corresponde ao email do usuário")
        }

        if(grid.team.indexOf(userId) != -1){
            throw new Error("Você já está na equipe ou já foi convidado")
        }
        
        if(gridInvitation.status != "enviado"){
            throw new Error("Este convite já foi usado ou expirou")
        }



        const gridInvitationAccept = await prismaClient.gridInvitations.update({
            where: {
                id: id,
            },
            data: {
                status: accept ? "ativo" : "recusado",
                user_id: userId,
                name: user.name,
                update_at: new Date()
            }
        })

        if(accept){
            await prismaClient.grid.update({
                where: {
                    id: grid.id,
                },
                data: {
                    team: grid.team+`${userId};`
                }
            })
        }
       
        return (gridInvitationAccept)
    }
}

export { AcceptInviteService }