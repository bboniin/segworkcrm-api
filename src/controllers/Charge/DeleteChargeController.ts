import { Request, Response } from 'express';
import { DeleteChargeService } from '../../services/Charge/DeleteChargeService';

class DeleteChargeController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deleteChargeService = new DeleteChargeService

        const charge = await deleteChargeService.execute({
            id
        })

        return res.json(charge)
    }
}

export { DeleteChargeController }