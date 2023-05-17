import { Request, Response } from 'express';
import { EditTableService } from '../../services/Table/EditTableService';

class EditTableController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const { name, order, view_conversion } = req.body

        const editTableService = new EditTableService

        const table = await editTableService.execute({
            id, name, order, view_conversion
        })

        return res.json(table)
    }
}

export { EditTableController } 