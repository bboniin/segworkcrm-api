import { Request, Response } from 'express';
import { InviteGridService } from '../../services/InviteGrid/InviteGridService';

class InviteGridController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { email,name } = req.body

        let userId = req.userId

        const inviteGridService = new InviteGridService

        const grid = await inviteGridService.execute({
            id, email, name, userId
        })

        return res.json(grid)
    }
}

export { InviteGridController }