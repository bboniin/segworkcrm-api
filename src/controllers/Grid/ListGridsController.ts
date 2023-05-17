import { Request, Response } from 'express';
import { ListGridsService } from '../../services/Grid/ListGridsService';

class ListGridsController {
    async handle(req: Request, res: Response) {

        let userId = req.userId

        const listGridsService = new ListGridsService

        const grids = await listGridsService.execute({
            userId
        })

        return res.json(grids)
    }
}

export { ListGridsController }