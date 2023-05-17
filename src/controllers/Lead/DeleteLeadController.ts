import { Request, Response } from 'express';
import { DeleteLeadService } from '../../services/Lead/DeleteLeadService';

class DeleteLeadController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        const deleteLeadService = new DeleteLeadService

        const user = await deleteLeadService.execute({
            id
        })

        return res.json(user)
    }
}

export { DeleteLeadController }