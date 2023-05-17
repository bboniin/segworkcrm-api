import prismaClient from '../../prisma'
import { differenceInDays } from 'date-fns';


class ExpireAndDeleteInviteService {
    async execute({}) {

        const gridInvitations = await prismaClient.gridInvitations.findMany({})

        gridInvitations.map(async (item)=>{
            if(differenceInDays(item.update_at, new Date()) <= -2 && item.status == "enviado") {
                await prismaClient.gridInvitations.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        status: "expirado",
                        update_at: new Date(),
                    }
            })
            }else{
                if(differenceInDays(item.update_at, new Date()) <= -5 && (item.status == "expirado" || item.status == "recusado")){
                    await prismaClient.gridInvitations.delete({
                        where: {
                            id: item.id
                        }
                    })
                }
            }

        })

        return (gridInvitations)
    }
}

export { ExpireAndDeleteInviteService }