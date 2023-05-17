import prismaClient from '../../prisma'

interface InviteRequest {
    id: string;
}

class GetInviteService {
    async execute({ id }: InviteRequest) {

        const gridInvitation = await prismaClient.gridInvitations.findUnique({
            where: {
                id: id
            }
        })

        if(!gridInvitation){
            throw new Error("Convite não existe mais")
        }

        if(gridInvitation.status == "expirado"){
            throw new Error("Convite expirou, solicite outro")
        }

        
        if(gridInvitation.status == "recusado"){
            throw new Error("Convite ja foi recusado")
        }

        if(gridInvitation.status == "ativo"){
            throw new Error("Convite ja foi aceito")
        }

        return (gridInvitation)
    }
}

export { GetInviteService }