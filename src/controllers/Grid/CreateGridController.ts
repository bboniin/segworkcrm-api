import { Request, Response } from 'express';
import { CreateGridService } from '../../services/Grid/CreateGridService';

class CreateGridController {
    async handle(req: Request, res: Response) {
        const { name } = req.body

        let userId = req.userId

        const createGridService = new CreateGridService

        const grid = await createGridService.execute({
            name, userId
        })

        return res.json(grid)
    }
}

export { CreateGridController }