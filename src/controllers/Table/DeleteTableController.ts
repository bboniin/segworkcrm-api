import { Request, Response } from 'express';
import { DeleteTableService } from '../../services/Table/DeleteTableService';

class DeleteTableController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deleteTableService = new DeleteTableService

        const table = await deleteTableService.execute({
            id
        })

        return res.json(table)
    }
}

export { DeleteTableController }