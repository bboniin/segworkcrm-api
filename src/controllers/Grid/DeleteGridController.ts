import { Request, Response } from 'express';
import { DeleteGridService } from '../../services/Grid/DeleteGridService';

class DeleteGridController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deleteGridService = new DeleteGridService

        const grid = await deleteGridService.execute({
            id
        })

        return res.json(grid)
    }
}

export { DeleteGridController }