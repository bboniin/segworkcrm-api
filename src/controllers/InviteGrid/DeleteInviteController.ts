import { Request, Response } from 'express';
import { DeleteInviteService } from '../../services/InviteGrid/DeleteInviteService';

class DeleteInviteController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deleteInviteService = new DeleteInviteService

        const gridInvitation = await deleteInviteService.execute({
            id
        })

        return res.json(gridInvitation)
    }
}

export { DeleteInviteController }