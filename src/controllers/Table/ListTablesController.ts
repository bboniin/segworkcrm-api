import { Request, Response } from 'express';
import { ListTablesService } from '../../services/Table/ListTablesService';

class ListTablesController {
    async handle(req: Request, res: Response) {

        const { grid_id } = req.body

        const listTablesService = new ListTablesService

        const services = await listTablesService.execute({
            grid_id
        })

        return res.json(services)
    }
}

export { ListTablesController }