import { Request, Response } from 'express';
import { GetInviteService } from '../../services/InviteGrid/GetInviteService';

class GetInviteController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const getInviteService = new GetInviteService

        const gridInvitation = await getInviteService.execute({
            id
        })

        return res.json(gridInvitation)
    }
}

export { GetInviteController }