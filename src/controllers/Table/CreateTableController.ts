import { Request, Response } from 'express';
import { CreateTableService } from '../../services/Table/CreateTableService';

class CreateTableController {
    async handle(req: Request, res: Response) {
        const { name, order, grid_id, view_conversion } = req.body

        const createTableService = new CreateTableService

        const table = await createTableService.execute({
            name, order, grid_id, view_conversion
        })

        return res.json(table)
    }
}

export { CreateTableController }