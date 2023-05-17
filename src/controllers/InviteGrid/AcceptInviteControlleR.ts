import { Request, Response } from 'express';
import { AcceptInviteService } from '../../services/InviteGrid/AcceptInviteService';

class AcceptInviteController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { accept } = req.body

        let userId = req.userId
        
        const acceptInviteService = new AcceptInviteService

        const gridInvitation = await acceptInviteService.execute({
            id, accept, userId
        })

        return res.json(gridInvitation)
    }
}

export { AcceptInviteController }