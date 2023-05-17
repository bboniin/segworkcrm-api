import { Request, Response } from 'express';
import { EditGridService } from '../../services/Grid/EditGridService';

class EditGridController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { name, tables } = req.body

        let userId = req.userId

        const editGridService = new EditGridService

        const grid = await editGridService.execute({
            id, name, userId, tables
        })

        return res.json(grid)
    }
}

export { EditGridController } 